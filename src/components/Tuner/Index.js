import Recording from "react-native-recording";
//import PitchFinder from "pitchfinder";
import { PermissionsAndroid } from "react-native";

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export default class Tuner {

  middleA = 440;
  semitone = 69;
  noteStrings = [
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ];

  constructor(sampleRate = 22050, bufferSize = 2048) {
    this.model = tf.Model;
    this.sampleRate = sampleRate;
    this.bufferSize = bufferSize;
    //   this.pitchFinder = new PitchFinder.YIN({ sampleRate: this.sampleRate });
    this.NUM_INPUT_SAMPLES = 2048;
    this.MODEL_SAMPLE_RATE = 16000;
    this.PT_OFFSET = 25.58
    this.PT_SLOPE = 63.07
    this.CONF_THRESHOLD = 0.9;
  }

  init = async () => {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    try {
      await tf.ready();
    }
    catch (error) {
      console.error(error);
    }

    try {
      this.model = await tf.loadGraphModel('https://tfhub.dev/google/tfjs-model/spice/2/default/1', { fromTFHub: true });
      console.log("model loaded")
    }
    catch (error) {
      console.log("error", error)
    }


    Recording.init({
      sampleRate: this.sampleRate,
      bufferSize: this.bufferSize,
    });
  }

  start = () => {

    Recording.start();

    Recording.addRecordingEventListener((data) => {
      this.handleSuccess(data)
      //const frequency  = this.pitchFinder(data);


    });
  }

  stop = () => {
    Recording.stop();
  }

  getNote(frequency) {
    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
    return Math.round(note) + this.semitone;
  }

  getStandardFrequency(note) {
    return this.middleA * Math.pow(2, (note - this.semitone) / 12);
  }

  getPitchHz(modelPitch) {
    const fmin = 10.0;
    const bins_per_octave = 12.0;
    const cqt_bin = modelPitch * this.PT_SLOPE + this.PT_OFFSET;

    return fmin * Math.pow(2.0, (1.0 * cqt_bin / bins_per_octave))
  }

  handleSuccess(stream) {

    const input = tf.reshape(tf.tensor(stream), [this.NUM_INPUT_SAMPLES])

    output = this.model.execute({ "input_audio_samples": input });

    const uncertainties = output[0].dataSync();
    const pitches = output[1].dataSync();

    for (let i = 0; i < pitches.length; ++i) {
      let confidence = 1.0 - uncertainties[i];

      if (confidence < this.CONF_THRESHOLD) {
        let frequency = this.getPitchHz(pitches[i]);
        if (frequency && this.onNoteDetected) {
          const note = this.getNote(frequency);
          if (parseInt(note / 12) - 1) {
            this.onNoteDetected({
              name: this.noteStrings[note % 12],
              value: note,
              //  cents: this.getCents(frequency, note),
              octave: parseInt(note / 12) - 1,
              frequency: frequency,
            });
          }


        }
      }

    }

  }

  // getCents(frequency, note) {
  //   return Math.floor(
  //     (1200 * Math.log(frequency / this.getStandardFrequency(note))) /
  //       Math.log(2)
  //   );
  // }
}