// assets/js/terminal.js

class Terminal {
  constructor(elementId) {
    this.terminal = document.getElementById(elementId);
    this.commandHistory = [];
    this.historyIndex = 0;
    this.currentDir = "~";
    this.typingSpeed = 50; // ms per character
    this.initializeCommands();
    this.initialize();
  }

  initialize() {
    this.createTerminalLine();

    // Auto-execute some initial commands
    this.autoExecuteCommands([
      { command: "whoami", delay: 500 },
      { command: "cat about.txt", delay: 1500 },
      { command: "ls -la projects/", delay: 2500 },
      { command: "cat skills.txt", delay: 3500 }
    ]);
  }

  autoExecuteCommands(commands) {
    let totalDelay = 0;

    commands.forEach(cmd => {
      totalDelay += cmd.delay;

      setTimeout(() => {
        this.typeCommand(cmd.command);
      }, totalDelay);
    });
  }

  typeCommand(command) {
    const commandLine = this.terminal.querySelector(".command-line:last-child .command");
    let i = 0;

    const typeChar = () => {
      if (i < command.length) {
        commandLine.textContent += command.charAt(i);
        i++;
        setTimeout(typeChar, this.typingSpeed);
      } else {
        // Command fully typed, now execute it
        setTimeout(() => {
          this.executeCommand(command);
        }, 300);
      }
    };

    typeChar();
  }

  createTerminalLine() {
    const line = document.createElement("div");
    line.className = "command-line";

    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.innerHTML = `<span class="user">akhil</span>@<span class="host">trading-rig</span>:<span class="directory">${this.currentDir}</span>$ `;

    const command = document.createElement("span");
    command.className = "command";

    line.appendChild(prompt);
    line.appendChild(command);
    this.terminal.appendChild(line);

    return command;
  }

  createOutput(content, className = "output") {
    const output = document.createElement("div");
    output.className = className;
    output.innerHTML = content;
    this.terminal.appendChild(output);

    // Scroll to bottom
    this.terminal.scrollTop = this.terminal.scrollHeight;
  }

  executeCommand(command) {
    this.commandHistory.push(command);
    this.historyIndex = this.commandHistory.length;

    const cmd = command.trim().split(" ")[0];
    const args = command.trim().split(" ").slice(1);

    if (this.commands[cmd]) {
      this.commands[cmd](args);
    } else if (cmd) {
      this.createOutput(`Command not found: ${cmd}. Try 'help' to see available commands.`);
    }

    this.createTerminalLine();
  }

  initializeCommands() {
    this.commands = {
      help: () => {
        this.createOutput(`
          <div class="help-title">Available commands:</div>
          <div class="help-cmd">whoami</div> - Display profile information
          <div class="help-cmd">cat [filename]</div> - Display file contents
          <div class="help-cmd">ls [directory]</div> - List directory contents
          <div class="help-cmd">clear</div> - Clear the terminal
          <div class="help-cmd">help</div> - Display this help message
        `);
      },

      whoami: () => {
        this.createOutput(`
          <div class="profile">
            <div class="profile-name">Akhil Tiwari</div>
            <div class="profile-title">HFT & Trading Systems Engineer</div>
            <div class="profile-details">
              Location: Bengaluru, India<br>
              Experience: 10+ years in low-latency trading systems<br>
              Specialization: C++ optimization, exchange connectivity, market data systems
            </div>
          </div>
        `);
      },

      cat: (args) => {
        const filename = args[0];

        const files = {
          "about.txt": `
            <div class="file-content">
              <p>Trading systems engineer with deep expertise in high-frequency trading (HFT) infrastructures,
              low-latency execution platforms, and real-time trading systems.</p>

              <p>Over 10 years of experience designing and optimizing ultra-low latency systems in C++.
              Specialized in messaging systems, tick-to-order pipelines, exchange gateways,
              and infrastructure benchmarking tools.</p>

              <p>I help firms achieve nanosecond-level optimizations in their trading infrastructure,
              develop robust exchange connectivity solutions, and implement cutting-edge market data processing systems.</p>
            </div>
          `,

          "skills.txt": `
            <div class="file-content">
              <div class="skill-category">Programming Languages:</div>
              - C++ (11/14/17/20) [■■■■■]
              - Python [■■■■□]
              - Rust [■■■□□]
              - Go [■■■□□]

              <div class="skill-category">Trading Technologies:</div>
              - Low-latency Architectures [■■■■■]
              - FIX/SBE Protocol Implementation [■■■■■]
              - Market Data Processing [■■■■■]
              - Order Execution Systems [■■■■□]
              - Smart Order Routing [■■■■□]

              <div class="skill-category">Performance Optimization:</div>
              - CPU Cache Optimization [■■■■■]
              - Lock-free Programming [■■■■■]
              - Memory Layout Design [■■■■■]
              - SIMD Vectorization [■■■■□]
              - Linux Kernel Tuning [■■■■□]
            </div>
          `,

          "contact.txt": `
            <div class="file-content">
              <p>Email: akhiltiwari.13@gmail.com</p>
              <p>LinkedIn: linkedin.com/in/akhiltiwari-13/</p>
              <p>GitHub: github.com/akhiltiwari13</p>
            </div>
          `
        };

        if (filename in files) {
          this.createOutput(files[filename]);
        } else {
          this.createOutput(`cat: ${filename}: No such file or directory`);
        }
      },

      ls: (args) => {
        const directory = args.length > 0 ? args[0] : ".";
        const showHidden = args.includes("-a") || args.includes("-la") || args.includes("-al");
        const longFormat = args.includes("-l") || args.includes("-la") || args.includes("-al");

        const directories = {
          ".": [
            { name: "about.txt", type: "file", size: "1.2K" },
            { name: "skills.txt", type: "file", size: "2.4K" },
            { name: "contact.txt", type: "file", size: "0.3K" },
            { name: "projects", type: "directory", size: "4.0K" }
          ],
          "projects": [
            { name: "hft-latency-analyzer", type: "directory", size: "4.0K" },
            { name: "exchange-gateway", type: "directory", size: "4.0K" },
            { name: "market-data-processor", type: "directory", size: "4.0K" }
          ],
          "projects/": [
            { name: "hft-latency-analyzer", type: "directory", size: "4.0K" },
            { name: "exchange-gateway", type: "directory", size: "4.0K" },
            { name: "market-data-processor", type: "directory", size: "4.0K" }
          ]
        };

        if (directory in directories) {
          let output = "";

          if (longFormat) {
            output += "<div class='ls-header'>total " + directories[directory].length + "</div>";

            directories[directory].forEach(item => {
              const permissions = item.type === "directory" ? "drwxr-xr-x" : "-rw-r--r--";
              const date = "May 15 14:32";
              output += `<div class='ls-item'>${permissions} 1 akhil users ${item.size.padStart(8)} ${date} <span class='${item.type === "directory" ? "directory-name" : "file-name"}'>${item.name}</span></div>`;
            });
          } else {
            output += "<div class='ls-simple'>";
            directories[directory].forEach(item => {
              output += `<span class='${item.type === "directory" ? "directory-name" : "file-name"}'>${item.name}</span> `;
            });
            output += "</div>";
          }

          this.createOutput(output);
        } else {
          this.createOutput(`ls: cannot access '${directory}': No such file or directory`);
        }
      },

      clear: () => {
        while (this.terminal.firstChild) {
          this.terminal.removeChild(this.terminal.firstChild);
        }
      }
    };
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("terminal-simulator")) {
    const terminal = new Terminal("terminal-simulator");
  }
});
