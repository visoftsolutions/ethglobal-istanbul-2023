export class TasksScheduler {
  constructor() {
    this.tasks = []; // Initialize an empty array to hold tasks
    this.isRunning = false; // Flag to control the execution loop
    this.start(); // Start the execution loop
  }

  // Method to add a new task to the scheduler
  pushTask(task) {
    this.tasks.push(task);
    if (!this.isRunning) {
      this.start(); // Start the execution loop if not already running
    }
  }

  // Internal method to start the task execution loop
  start() {
    this.isRunning = true;
    this.run();
  }

  // Internal method to run tasks
  async run() {
    while (this.tasks.length > 0) {
      const task = this.tasks.shift(); // Get the oldest task
      await this.executeTask(task); // Execute the task
    }
    this.isRunning = false; // No more tasks, stop the loop
  }

  // Method to execute a task with a 1 second delay
  async executeTask(task) {
    console.log("Executing task:", task);
    await this.sleep(1000); // Wait for 1 second
    // Add logic here to handle the execution of the task
  }

  // Utility method to delay execution for a given number of milliseconds
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
