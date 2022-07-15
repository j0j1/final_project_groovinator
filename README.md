# GROOVINATOR
Browser Synthesizer and 16 step Sequencer
![ScreenShot](./client/public/Screenshot%20(21).png)
---
Groovinator was built as my final project for Concordia Bootcamps Web Developer program and was inspired by my passion for electronic music and the methods and tools used to create it. It is intended to provide users with the basic foundational tools for creating electronic music: a sequencer for composing a repeating rythmic musical pattern and a synthesizer for designing and editing the sound being played by the pattern.

This application makes heavy use of the Web Audio API for all auditory elements and outputs (oscilators, filters and amplification).

The Synthesizer
![Sythesizer](./client/public/Screenshot%20(23).png)
---
Groovinator uses basic subtractive syhtesis techniques and permits user to edit the sounds being generated through different interfaces.

Users can select different waveforms for either of groovinators 2 oscillators. change the volume of each individual oscilattor and tune their pitch through either octave of detuning inputs.

User can also define the type of filter being applied to the sound (high-pass, band-pass or low-pass), the cutoff frequency and resonance level.

The Amplification envelope permits users to define how the volume of the sound is affected over time with both attack and decay inputs


The Sequencer
![Sequencer](./client/public/Screenshot%20(24).png)
---
Groovinators 16 step sequencer provides users a interface for defining a repeating musical pattern.

Each of groovinators 16 dials corresponds to the order and timing by which notes are played. When the user presses play the program iterates through the sequence triggering what notes to be played by the synthesizer based on user input.

User turns a note on by clicking on any of the 12 buttons arranged around the dials circumfrence. The button at the 12 o'clock position represents the lowest possible note with each subsequent button in clockwise order represents a note of one semitone highter than the previous with 11 being the hightest.

User can change the relative octave of each indivual step by clicking the arrows either up or down. This is visually represented by changing the color of the arrows with a purple tone representing the lowest possible ocatve and pink representing the highest.

User can redefine the BPM (beats per minute) and play or pause the sequence.

![GROOVINATOR](./client/public/Screenshot%20(22).png)
