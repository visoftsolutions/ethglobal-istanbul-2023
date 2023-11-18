import { EventEmitter } from "events";

export const sleep = ms => new Promise(r => setTimeout(r, ms));

export class LCD {
  constructor(lcd) {
    this.lcd = lcd;
  }

  /**
   * Initialize the LCD and wait for it to be ready.
   * Resolves when LCD signals it's ready, rejects on errors or timeout.
   */
  init() {
    return new Promise((resolve, reject) => {
      this.lcd.on("ready", resolve);
      this.lcd.on("error", (err) => reject(err)); // Reject on LCD error
      setTimeout(() => reject(new Error("LCD init timeout")), 5000); // Timeout for initialization
    });
  }

  /**
   * Clear the LCD display and return to home position.
   * Resolves on success, rejects on errors.
   */
  clear() {
    return new Promise((resolve, reject) => {
      this.lcd.clear((err) => {
        if (err) return reject(err);
        this.lcd.home((err) => {
          err ? reject(err) : resolve();
        });
      });
    });
  }

  /**
   * Print text on a specific line of the LCD.
   * Resolves on success, rejects on errors.
   */
  print(text, line) {
    return new Promise((resolve, reject) => {
      this.lcd.setCursor(0, line);
      this.lcd.print(text, (err) => {
        err ? reject(err) : resolve();
      });
    });
  }
}

export class Switch extends EventEmitter {
  constructor(gpio) {
    super();
    this.gpio = gpio;
    this.watch();
  }

  /**
   * Watches GPIO input and emits a 'click' event on change.
   * Emits only if the GPIO value is 1.
   */
  watch() {
    this.gpio.watch((err, val) => {
      if (err) {
        this.emit("error", err);
      } else if (val === 1) {
        this.emit("click", "Event emitted from Switch!");
      }
    });
  }
}

export class Transistor {
  constructor(gpio) {
    this.gpio = gpio;
  }

  /**
   * Turn on the transistor.
   */
  async turnOn() {
    await this.gpio.write(1);
  }

  /**
   * Turn off the transistor.
   */
  async turnOff() {
    await this.gpio.write(0);
  }
}
