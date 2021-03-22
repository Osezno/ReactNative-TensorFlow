import Recording from "react-native-recording";
import PitchFinder from "pitchfinder";
import { PermissionsAndroid } from "react-native";



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
    this.sampleRate = sampleRate;
    this.bufferSize = bufferSize;
    this.pitchFinder = new PitchFinder.YIN({ sampleRate: this.sampleRate });
  }

  init = async () => {
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);

    Recording.init({
      sampleRate: this.sampleRate,
      bufferSize: this.bufferSize,
    });
  }

  start = () => {

    Recording.start();

    Recording.addRecordingEventListener((data) => {

      const frequency = this.pitchFinder(data);
    //  console.log(data)
      if (frequency && this.onNoteDetected) {
        const note = this.getNote(frequency);
        this.onNoteDetected({
          name: this.noteStrings[note % 12],
          value: note,
          //  cents: this.getCents(frequency, note),
          octave: parseInt(note / 12) - 1,
          frequency: frequency,
        });
      }
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

  // getCents(frequency, note) {
  //   return Math.floor(
  //     (1200 * Math.log(frequency / this.getStandardFrequency(note))) /
  //       Math.log(2)
  //   );
  // }
}