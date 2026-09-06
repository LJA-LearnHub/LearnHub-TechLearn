/* =========================================================================
   PathLearn — CONTENT FILE
   =========================================================================
   This is the ONLY file you need to touch to put in your own material.
   Nothing in here needs any JavaScript knowledge beyond editing text
   between quotes and adding/removing entries in the lists below.

   STRUCTURE
   ---------
   COURSE_DATA
     └─ units: [ ... ]                 one "section" of the path, gets its
                                        own colored banner
          └─ lessons: [ ... ]          one node on the path
               └─ exercises: [ ... ]   the questions asked inside a lesson

   UNIT fields
   -----------
     id          unique short string, e.g. "unit-1"
     title       shown on the banner, e.g. "Getting Started"
     description short line under the title (optional, can delete the key)
     accent      "blue" or "orange" — controls the banner color

   LESSON fields
   -------------
     id          unique short string, e.g. "u1-l1"
     title       not shown on the path itself (Duolingo-style), but used
                 for the "START" tooltip's accessible label
     icon        an emoji shown inside the path node, e.g. "📘"
     checkpoint  true/false (optional) — makes the node bigger, use this
                 for a "test" lesson every so often
     exercises   list of exercise objects, see below

   EXERCISE TYPES
   ---------------
   1) Multiple choice
      {
        type: "multiple-choice",
        question: "Which word means 'hello'?",
        options: ["Adiós", "Hola", "Gracias", "Por favor"],
        correctIndex: 1,                 // index into options, starts at 0
        explanation: "Hola is the everyday greeting for 'hello'."  // optional
      }

   2) Type the answer
      {
        type: "type-answer",
        question: "Type the word for 'thank you' in Spanish.",
        accepted: ["gracias"],           // any of these count as correct,
                                          // matching ignores case/spacing
        hint: "Starts with a G",         // optional
        explanation: "Gracias is used in both formal and casual settings." // optional
      }

   3) Match the pairs
      {
        type: "match-pairs",
        instruction: "Match each word to its translation",
        pairs: [
          { left: "Hello",      right: "Hola" },
          { left: "Goodbye",    right: "Adiós" },
          { left: "Please",     right: "Por favor" },
          { left: "Thank you",  right: "Gracias" }
        ]
      }

   4) True or false
      {
        type: "true-false",
        statement: "RAM is used for short-term working data.",
        correct: true,
        explanation: "RAM holds data that the computer is actively using."
      }

   5) Select more than one
      {
        type: "multi-select",
        question: "Which are storage devices?",
        options: ["SSD", "RAM", "HDD", "CPU"],
        correctIndices: [0, 2]
      }

   6) Fill in the blank
      {
        type: "fill-blank",
        prompt: "The CPU is the ____ of the computer.",
        accepted: ["brain"],
        hint: "It performs instructions"
      }

   7) Put items in order
      {
        type: "order-items",
        question: "Put the troubleshooting steps in the best order.",
        items: ["Test the fix", "Identify the problem", "Apply a solution"],
        correctOrder: [1, 2, 0]
      }

   TO ADD A NEW UNIT
   ------------------
   Copy one of the objects inside `units: [ ... ]` below, paste it as a
   new entry, and change the id/title/lessons. Order in the list = order
   on the path, top to bottom.

   TO ADD A NEW LESSON
   ---------------------
   Same idea: copy a lesson object inside a unit's `lessons: [ ... ]`
   list, paste it as a new entry, give it a unique id, and fill in your
   own exercises.

   Lessons unlock in order: the first lesson of the first unit is always
   open, and each next lesson unlocks once the one before it is finished.
   ========================================================================= */

window.COURSE_DATA = {
  courseTitle: "TechLearn",

  units: [
    // ===== OBJECTIVE 1: COMPUTING CONCEPTS (1.0 - 13%) =====
    {
      id: "obj1-unit1",
      title: "1.1 - Basics of Computing",
      description: "Input, Processing, Output, and Storage fundamentals",
      accent: "blue",
      lessons: [
        {
          id: "obj1u1-l1",
          title: "IPOS Model Fundamentals",
          icon: "⚙️",
          exercises: [
            {
              type: "multiple-choice",
              question: "Which component of the IPOS model refers to entering data into a computer?",
              options: ["Processing", "Input", "Output", "Storage"],
              correctIndex: 1,
              explanation: "Input is any data or commands sent TO the computer from external sources like keyboards, mice, or sensors."
            },
            {
              type: "match-pairs",
              instruction: "Match each IPOS stage to a real-world example",
              pairs: [
                { left: "Input", right: "User clicks a mouse button" },
                { left: "Processing", right: "CPU calculates the result" },
                { left: "Output", right: "Monitor displays an image" },
                { left: "Storage", right: "File saved to hard drive" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What does the CPU do in the processing stage?",
              options: ["Displays information on screen", "Executes instructions and performs calculations", "Stores data permanently", "Receives user input"],
              correctIndex: 1,
              explanation: "Processing is when the CPU takes input and performs calculations, logical operations, and follows program instructions."
            },
            {
              type: "true-false",
              statement: "Storage and Processing are the same thing in the IPOS model.",
              correct: false,
              explanation: "Storage is permanent data retention; Processing is temporary manipulation of data by the CPU."
            },
            {
              type: "multi-select",
              question: "Which are examples of output devices?",
              options: ["Monitor", "Speaker", "Keyboard", "Printer", "Microphone"],
              correctIndices: [0, 1, 3],
              explanation: "Output devices send data FROM computer to user. Monitor, Speaker, Printer are output. Keyboard and Microphone are input."
            },
            {
              type: "fill-blank",
              prompt: "The ____ stage of the IPOS model saves data for permanent retention.",
              accepted: ["storage"],
              hint: "Long-term data retention",
              explanation: "Storage preserves data on drives, SSDs, or cloud systems for later retrieval."
            }
          ]
        },
        {
          id: "obj1u1-l2",
          title: "Input & Output Devices",
          icon: "🖱️",
          exercises: [
            {
              type: "multiple-choice",
              question: "Which of the following is an INPUT device?",
              options: ["Monitor", "Printer", "Keyboard", "Speaker"],
              correctIndex: 2,
              explanation: "A keyboard sends data TO the computer. Monitors and speakers receive data FROM the computer."
            },
            {
              type: "true-false",
              statement: "A touchscreen can function as both an input and output device.",
              correct: true,
              explanation: "Touchscreens display output AND detect touch input, making them input/output devices."
            },
            {
              type: "match-pairs",
              instruction: "Classify each device as Input or Output",
              pairs: [
                { left: "Webcam", right: "Input" },
                { left: "Headphones", right: "Output" },
                { left: "Joystick", right: "Input" },
                { left: "Projector", right: "Output" },
                { left: "Microphone", right: "Input" },
                { left: "Monitor", right: "Output" }
              ]
            },
            {
              type: "multi-select",
              question: "Which devices can accept user input?",
              options: ["Scanner", "Trackpad", "Camera", "LCD Display", "Stylus Pen"],
              correctIndices: [0, 1, 2, 4],
              explanation: "Scanners, trackpads, cameras, and stylus pens all send data into the computer. LCD displays only show output."
            }
          ]
        },
        {
          id: "obj1u1-l3",
          title: "IPOS Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "A user types on a keyboard. What stage of IPOS is this?",
              options: ["Processing", "Input", "Output", "Storage"],
              correctIndex: 1
            },
            {
              type: "type-answer",
              question: "Name the stage where data is sent FROM the computer to the user.",
              accepted: ["output"],
              hint: "Information displayed or printed",
              explanation: "Output is when information goes from the computer to the user or external devices."
            },
            {
              type: "match-pairs",
              instruction: "Match device types",
              pairs: [
                { left: "Keyboard", right: "Input" },
                { left: "Monitor", right: "Output" },
                { left: "Microphone", right: "Input" }
              ]
            }
          ]
        }
      ]
    },

    {
      id: "obj1-unit2",
      title: "1.2 - Notational Systems",
      description: "Binary, Decimal, Hexadecimal, and Octal number systems",
      accent: "blue",
      lessons: [
        {
          id: "obj1u2-l1",
          title: "Number System Basics",
          icon: "🔢",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each number system to its base and example",
              pairs: [
                { left: "Binary", right: "Base 2 (uses 0 and 1)" },
                { left: "Octal", right: "Base 8 (uses 0-7)" },
                { left: "Decimal", right: "Base 10 (uses 0-9)" },
                { left: "Hexadecimal", right: "Base 16 (uses 0-9, A-F)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "How many unique digits does the binary number system use?",
              options: ["8", "10", "2", "16"],
              correctIndex: 2,
              explanation: "Binary uses only 0 and 1. It's called 'Base 2' because there are 2 possible digits."
            },
            {
              type: "multiple-choice",
              question: "In hexadecimal, what letter represents the value 10?",
              options: ["D", "A", "B", "C"],
              correctIndex: 1,
              explanation: "Hexadecimal uses 0-9 and then A-F. A=10, B=11, C=12, D=13, E=14, F=15."
            },
            {
              type: "true-false",
              statement: "Computers use decimal numbers internally like humans do.",
              correct: false,
              explanation: "Computers use binary internally. Decimal is for humans; binary is how computers store and process data."
            },
            {
              type: "fill-blank",
              prompt: "The ____ number system is Base 16 and uses digits 0-9 and letters A-F.",
              accepted: ["hexadecimal"],
              hint: "Often abbreviated as hex",
              explanation: "Hexadecimal is widely used in programming and networking to represent binary data more compactly."
            }
          ]
        },
        {
          id: "obj1u2-l2",
          title: "Binary Conversions",
          icon: "💻",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is the decimal value of the binary number 1010?",
              options: ["8", "10", "12", "14"],
              correctIndex: 1,
              explanation: "1010 in binary = (1×8) + (0×4) + (1×2) + (0×1) = 8 + 0 + 2 + 0 = 10 in decimal."
            },
            {
              type: "multiple-choice",
              question: "What is the decimal value of 1111 in binary?",
              options: ["12", "14", "15", "16"],
              correctIndex: 2,
              explanation: "1111 = (1×8) + (1×4) + (1×2) + (1×1) = 8 + 4 + 2 + 1 = 15 in decimal."
            },
            {
              type: "true-false",
              statement: "The binary number 11111111 equals 256 in decimal.",
              correct: false,
              explanation: "11111111 = 255 in decimal. 256 would be 100000000 (a 1 followed by eight 0s)."
            },
            {
              type: "multiple-choice",
              question: "How many bits are needed to represent the decimal number 8?",
              options: ["2 bits", "3 bits", "4 bits", "8 bits"],
              correctIndex: 2,
              explanation: "8 in binary is 1000, which requires 4 bits. (1×8) + (0×4) + (0×2) + (0×1) = 8."
            },
            {
              type: "fill-blank",
              prompt: "A single binary digit (0 or 1) is called a ____.",
              accepted: ["bit"],
              hint: "Short for 'binary digit'",
              explanation: "A bit is the fundamental unit of binary information in computers."
            }
          ]
        },
        {
          id: "obj1u2-l3",
          title: "Hexadecimal & Octal",
          icon: "🔤",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is the hexadecimal value FF in decimal?",
              options: ["245", "255", "265", "275"],
              correctIndex: 1,
              explanation: "FF in hex = (15×16) + 15 = 240 + 15 = 255 in decimal. F is 15 in hex."
            },
            {
              type: "true-false",
              statement: "Hexadecimal is commonly used in networking for IPv6 addresses.",
              correct: true,
              explanation: "IPv6 addresses use hexadecimal notation to represent 128-bit addresses more compactly."
            },
            {
              type: "multiple-choice",
              question: "In octal (Base 8), what digits are allowed?",
              options: ["0-7", "0-8", "0-9", "0-F"],
              correctIndex: 0,
              explanation: "Octal uses 8 digits: 0, 1, 2, 3, 4, 5, 6, 7. Using 8 or 9 would be invalid in octal."
            },
            {
              type: "match-pairs",
              instruction: "Match hexadecimal letters to decimal values",
              pairs: [
                { left: "A", right: "10" },
                { left: "C", right: "12" },
                { left: "E", right: "14" },
                { left: "F", right: "15" }
              ]
            }
          ]
        },
        {
          id: "obj1u2-l4",
          title: "Notational Systems Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "What is 1100 in binary as a decimal number?",
              options: ["10", "12", "14", "16"],
              correctIndex: 1
            },
            {
              type: "type-answer",
              question: "What base does hexadecimal use?",
              accepted: ["16", "base 16"],
              hint: "It's higher than decimal",
              explanation: "Hexadecimal is Base 16 with 16 possible digit values."
            },
            {
              type: "true-false",
              statement: "The binary digit is called a byte.",
              correct: false,
              explanation: "A single binary digit is a BIT. A BYTE contains 8 bits."
            }
          ]
        }
      ]
    },

    {
      id: "obj1-unit3",
      title: "1.3-1.4 - Units & Troubleshooting",
      description: "Measurement units and CompTIA troubleshooting methodology",
      accent: "blue",
      lessons: [
        {
          id: "obj1u3-l1",
          title: "Storage Units of Measurement",
          icon: "📏",
          exercises: [
            {
              type: "multiple-choice",
              question: "How many bytes are in 1 kilobyte (KB)?",
              options: ["1,000", "1,024", "512", "2,048"],
              correctIndex: 1,
              explanation: "1 KB = 1,024 bytes (using binary). Note: sometimes 1,000 is used in decimal, but IT uses binary 1,024."
            },
            {
              type: "match-pairs",
              instruction: "Match storage units to their binary equivalents",
              pairs: [
                { left: "1 KB", right: "1,024 Bytes" },
                { left: "1 MB", right: "1,024 KB" },
                { left: "1 GB", right: "1,024 MB" },
                { left: "1 TB", right: "1,024 GB" },
                { left: "1 PB", right: "1,024 TB" }
              ]
            },
            {
              type: "fill-blank",
              prompt: "1 GB = ____ MB",
              accepted: ["1024"],
              hint: "It's the binary multiplier",
              explanation: "1 Gigabyte equals 1,024 Megabytes in the binary system used by computers."
            },
            {
              type: "true-false",
              statement: "A megabyte (MB) is smaller than a gigabyte (GB).",
              correct: true,
              explanation: "1 GB = 1,024 MB. Gigabytes are much larger than megabytes."
            },
            {
              type: "multiple-choice",
              question: "Which storage unit is largest?",
              options: ["Terabyte", "Petabyte", "Gigabyte", "Megabyte"],
              correctIndex: 1,
              explanation: "Petabyte (PB) > Terabyte (TB) > Gigabyte (GB) > Megabyte (MB)."
            }
          ]
        },
        {
          id: "obj1u3-l2",
          title: "Throughput & Processing Speed Units",
          icon: "⚡",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match speed units to what they measure",
              pairs: [
                { left: "Mbps", right: "Megabits per second (network speed)" },
                { left: "Gbps", right: "Gigabits per second (fast networks)" },
                { left: "MHz", right: "Megahertz (older processor speeds)" },
                { left: "GHz", right: "Gigahertz (modern processor speeds)" },
                { left: "Hz", right: "Hertz (clock cycles per second)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What does Mbps stand for?",
              options: ["Megabytes per second", "Megabits per second", "Memory bits per second", "Megaband per signal"],
              correctIndex: 1,
              explanation: "Mbps = Megabits per second. Note: BITS not BYTES. This is the standard for network speed."
            },
            {
              type: "multiple-choice",
              question: "Why is processor speed measured in GHz instead of MHz?",
              options: ["GHz is easier to remember", "Modern CPUs run at billions of cycles per second", "GHz is cheaper", "No real reason"],
              correctIndex: 1,
              explanation: "Modern processors run so fast that MHz would show huge numbers. GHz (gigahertz) is more practical."
            },
            {
              type: "true-false",
              statement: "A faster network speed in Gbps is 1,000 times faster than Mbps.",
              correct: true,
              explanation: "1 Gbps = 1,000 Mbps (using decimal). Gigabits are 1,000 times larger than megabits."
            },
            {
              type: "fill-blank",
              prompt: "A 100 Mbps internet connection can download ____ MB per second.",
              accepted: ["12.5", "12"],
              hint: "Divide megabits by 8 to get megabytes",
              explanation: "Network speeds are in bits; storage is in bytes. 100 Mbps ÷ 8 bits per byte ≈ 12.5 MB/s."
            }
          ]
        },
        {
          id: "obj1u3-l3",
          title: "CompTIA Troubleshooting Methodology",
          icon: "🔧",
          exercises: [
            {
              type: "order-items",
              question: "Put the 6-step CompTIA troubleshooting process in correct order",
              items: [
                "Identify the problem",
                "Establish a theory of probable cause",
                "Test the theory to determine the cause",
                "Establish a plan of action and implement a solution",
                "Verify full system functionality",
                "Document the findings and lesson learned"
              ],
              correctOrder: [0, 1, 2, 3, 4, 5],
              explanation: "This systematic approach ensures problems are solved methodically and consistently."
            },
            {
              type: "multiple-choice",
              question: "What should you do if your troubleshooting theory is incorrect?",
              options: [
                "Escalate immediately to management",
                "Loop back to Step 2 and establish a new theory",
                "Randomly try different solutions",
                "Give up and replace the hardware"
              ],
              correctIndex: 1,
              explanation: "CompTIA methodology has a feedback loop. If your theory is wrong, re-establish with new information."
            },
            {
              type: "match-pairs",
              instruction: "Match troubleshooting step to its key activity",
              pairs: [
                { left: "Step 1: Identify", right: "Gather symptoms by questioning users and reviewing logs" },
                { left: "Step 2: Theory", right: "Use knowledge and research to propose causes" },
                { left: "Step 3: Test", right: "Reproduce or verify your theory with evidence" },
                { left: "Step 4: Implement", right: "Execute the solution plan cautiously" },
                { left: "Step 5: Verify", right: "Confirm the problem is solved and systems work normally" },
                { left: "Step 6: Document", right: "Record all details for future reference and training" }
              ]
            },
            {
              type: "true-false",
              statement: "Documentation is optional in CompTIA troubleshooting methodology.",
              correct: false,
              explanation: "Documentation (Step 6) is mandatory. It helps future troubleshooting and builds organizational knowledge."
            },
            {
              type: "multi-select",
              question: "Which are important during the 'Identify the problem' step?",
              options: [
                "Ask detailed questions about when the problem started",
                "Check system logs and error messages",
                "Listen to user descriptions carefully",
                "Immediately restart the computer",
                "Research similar issues"
              ],
              correctIndices: [0, 1, 2, 4],
              explanation: "Gathering information is critical. Don't immediately restart; gather data first."
            }
          ]
        },
        {
          id: "obj1u3-l4",
          title: "Units & Troubleshooting Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "How many megabytes are in 1 gigabyte?",
              options: ["512", "1,000", "1,024", "2,048"],
              correctIndex: 2
            },
            {
              type: "type-answer",
              question: "What unit measures network speed in bits?",
              accepted: ["mbps", "Mbps", "gigabits per second", "gbps", "Gbps"],
              hint: "Used for internet speeds",
              explanation: "Mbps (megabits per second) or Gbps (gigabits per second) measure network throughput."
            },
            {
              type: "order-items",
              question: "Arrange the first 3 CompTIA troubleshooting steps",
              items: [
                "Establish a theory",
                "Test the theory",
                "Identify the problem"
              ],
              correctOrder: [2, 0, 1],
              explanation: "Identify first, then establish theory, then test the theory."
            }
          ]
        }
      ]
    },

    // ===== OBJECTIVE 2: INFRASTRUCTURE (2.0 - 24%) =====
    {
      id: "obj2-unit1",
      title: "2.1-2.3 - Computing Devices & Components",
      description: "Common devices, internal components, and storage types",
      accent: "orange",
      lessons: [
        {
          id: "obj2u1-l1",
          title: "Computing Devices Overview",
          icon: "📱",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each device type to its primary use",
              pairs: [
                { left: "Smartphone", right: "Mobile personal computing and communication" },
                { left: "Tablet", right: "Portable media consumption and light productivity" },
                { left: "Laptop", right: "Portable personal computing with full OS" },
                { left: "Desktop", right: "Stationary high-performance computing" },
                { left: "Server", right: "Provides services and resources to other computers" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Which device is typically designed to serve multiple users over a network?",
              options: ["Laptop", "Server", "Smartphone", "Tablet"],
              correctIndex: 1,
              explanation: "Servers are optimized for hosting applications and providing services to clients."
            },
            {
              type: "multi-select",
              question: "Which of these are IoT (Internet of Things) devices?",
              options: [
                "Smart thermostat",
                "Fitness tracker",
                "Smart refrigerator",
                "Desktop computer",
                "Connected doorbell camera"
              ],
              correctIndices: [0, 1, 2, 4],
              explanation: "IoT devices are connected devices with sensors/intelligence. Desktop is not typically an IoT device."
            },
            {
              type: "true-false",
              statement: "Wearable devices like smartwatches are examples of IoT technology.",
              correct: true,
              explanation: "Wearables are IoT devices that connect to networks and collect/transmit data."
            },
            {
              type: "fill-blank",
              prompt: "A ____ is a mobile device that emphasizes gaming with custom hardware and console experience.",
              accepted: ["gaming console", "console"],
              hint: "Like PlayStation or Xbox",
              explanation: "Gaming consoles are specialized devices optimized for gaming with dedicated graphics."
            }
          ]
        },
        {
          id: "obj2u1-l2",
          title: "Internal Hardware Components",
          icon: "🖥️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each component to its primary function",
              pairs: [
                { left: "CPU", right: "Executes instructions and performs calculations" },
                { left: "RAM", right: "Temporary volatile memory for active programs" },
                { left: "GPU", right: "Renders graphics and video" },
                { left: "Motherboard", right: "Central circuit board connecting all components" },
                { left: "PSU", right: "Converts AC power to DC for computer components" },
                { left: "NIC", right: "Enables network connectivity" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is the key difference between RAM and a hard drive?",
              options: [
                "RAM is faster but loses data when powered off",
                "Hard drives are faster but more expensive",
                "There is no significant difference",
                "RAM can store more data"
              ],
              correctIndex: 0,
              explanation: "RAM is fast but volatile (temporary). Storage drives are slower but non-volatile (permanent)."
            },
            {
              type: "true-false",
              statement: "The motherboard houses the CPU and RAM.",
              correct: true,
              explanation: "The motherboard is the main circuit board that CPU, RAM, and other components connect to."
            },
            {
              type: "multiple-choice",
              question: "Why does BIOS need CMOS battery backup?",
              options: [
                "To power the CPU",
                "To maintain date/time and BIOS settings when powered off",
                "To run antivirus software",
                "To speed up the computer"
              ],
              correctIndex: 1,
              explanation: "The CMOS battery (coin cell) maintains the BIOS settings and system clock even when the computer is off."
            },
            {
              type: "multi-select",
              question: "Which components are essential for a computer to boot?",
              options: ["CPU", "RAM", "Motherboard", "Hard Drive", "GPU"],
              correctIndices: [0, 1, 2],
              explanation: "CPU, RAM, and motherboard are essential to boot. GPU and hard drive are not required for basic boot."
            }
          ]
        },
        {
          id: "obj2u1-l3",
          title: "Storage Types & Technologies",
          icon: "💾",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match storage type to its characteristics",
              pairs: [
                { left: "HDD", right: "Magnetic spinning disk; slower but cheaper per GB" },
                { left: "SSD", right: "No moving parts; fast and reliable but more expensive" },
                { left: "NVMe", right: "Ultra-fast M.2 drive using PCIe; fastest storage option" },
                { left: "Flash Drive", right: "Portable USB storage using flash memory" },
                { left: "Optical Media", right: "CD/DVD/Blu-ray; slower but good for distribution" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why are SSDs becoming more common than HDDs in modern computers?",
              options: [
                "They hold more data",
                "They are much faster with no moving parts",
                "They never fail",
                "They are cheaper"
              ],
              correctIndex: 1,
              explanation: "SSDs have no moving parts, boot faster, open programs quickly, and are more reliable than HDDs."
            },
            {
              type: "true-false",
              statement: "NVMe drives connect via the M.2 slot and are faster than SATA SSDs.",
              correct: true,
              explanation: "NVMe uses the PCIe interface (via M.2 slot) which is much faster than SATA."
            },
            {
              type: "multiple-choice",
              question: "What type of storage is volatile (loses data when powered off)?",
              options: ["SSD", "HDD", "RAM", "Flash Drive"],
              correctIndex: 2,
              explanation: "RAM is the only volatile storage listed. It loses all data when power is removed."
            },
            {
              type: "fill-blank",
              prompt: "A ____ is a network storage system that allows multiple computers to access files over a network.",
              accepted: ["NAS", "network attached storage"],
              hint: "Common in offices and data centers",
              explanation: "NAS (Network Attached Storage) provides centralized file storage for networks."
            }
          ]
        },
        {
          id: "obj2u1-l4",
          title: "Devices & Components Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "Which component executes instructions in a computer?",
              options: ["Motherboard", "CPU", "RAM", "PSU"],
              correctIndex: 1
            },
            {
              type: "type-answer",
              question: "Name one type of storage that is non-volatile.",
              accepted: ["HDD", "SSD", "NVMe", "flash drive", "optical media"],
              hint: "Keeps data when powered off",
              explanation: "HDD, SSD, NVMe, flash drives, and optical media all retain data when powered off."
            },
            {
              type: "true-false",
              statement: "A server is a type of computing device designed to provide services to other computers.",
              correct: true,
              explanation: "Servers host applications and resources for client computers to access."
            }
          ]
        }
      ]
    },

    {
      id: "obj2-unit2",
      title: "2.4-2.5 - Peripherals & I/O Interfaces",
      description: "Peripheral installation and connector types",
      accent: "orange",
      lessons: [
        {
          id: "obj2u2-l1",
          title: "Peripheral Devices & Installation",
          icon: "🔌",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each peripheral to its typical installation method",
              pairs: [
                { left: "USB Printer", right: "Plug and Play (minimal or no setup)" },
                { left: "Network Printer", right: "Requires driver installation and network configuration" },
                { left: "USB Mouse", right: "Plug and Play (works immediately)" },
                { left: "Scanner", right: "Requires driver software for full functionality" },
                { left: "Monitor", right: "Plug and Play (uses standard display drivers)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is 'Plug and Play' (PnP) technology?",
              options: [
                "Devices that require manual installation",
                "Devices automatically recognized by OS with no driver needed",
                "A type of network protocol",
                "A backup utility"
              ],
              correctIndex: 1,
              explanation: "Plug and Play allows devices to be connected and work immediately without complex configuration."
            },
            {
              type: "true-false",
              statement: "All USB devices are Plug and Play and require no drivers.",
              correct: false,
              explanation: "Some USB devices (like printers and scanners) still need drivers for full functionality."
            },
            {
              type: "multi-select",
              question: "Which are common peripheral devices?",
              options: [
                "Printer",
                "Scanner",
                "External Hard Drive",
                "Webcam",
                "Motherboard"
              ],
              correctIndices: [0, 1, 2, 3],
              explanation: "Printers, scanners, external drives, and webcams are peripherals. Motherboard is internal."
            },
            {
              type: "fill-blank",
              prompt: "A ____ provides backup power and protects computers from power surges.",
              accepted: ["UPS", "uninterruptible power supply"],
              hint: "Used during power outages",
              explanation: "A UPS (Uninterruptible Power Supply) provides temporary power if the main power fails."
            }
          ]
        },
        {
          id: "obj2u2-l2",
          title: "Wired Connectors & Interfaces",
          icon: "🔗",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each connector to its primary purpose",
              pairs: [
                { left: "USB Type-A", right: "Standard peripheral connection (older devices)" },
                { left: "USB Type-C", right: "Universal modern connector (power + data)" },
                { left: "HDMI", right: "Video and audio output to displays" },
                { left: "DisplayPort", right: "High-bandwidth video connection" },
                { left: "Ethernet", right: "Wired network connection" },
                { left: "VGA", right: "Legacy analog video (mostly obsolete)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why is USB-C becoming the universal standard?",
              options: [
                "It's the cheapest connector",
                "It's reversible, supports high power and data, and works with all devices",
                "It's only for phones",
                "It replaces HDMI"
              ],
              correctIndex: 1,
              explanation: "USB-C is reversible, supports 100W power delivery, fast data, and is becoming universal."
            },
            {
              type: "true-false",
              statement: "Thunderbolt cables are physically identical to USB-C but carry different protocols.",
              correct: true,
              explanation: "Thunderbolt 3/4 use USB-C physical connectors but deliver higher bandwidth and features."
            },
            {
              type: "multiple-choice",
              question: "Which connection type is best for high-speed gaming monitors?",
              options: ["VGA", "HDMI", "DisplayPort", "Ethernet"],
              correctIndex: 2,
              explanation: "DisplayPort supports highest bandwidth and refresh rates needed for gaming monitors."
            },
            {
              type: "fill-blank",
              prompt: "______ is the wired network connector standard used for LAN connections.",
              accepted: ["Ethernet", "RJ45"],
              hint: "Used for internet in homes and offices",
              explanation: "Ethernet uses RJ45 connectors and provides wired network connectivity."
            }
          ]
        },
        {
          id: "obj2u2-l3",
          title: "Wireless Technologies",
          icon: "📡",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match wireless technology to its use case",
              pairs: [
                { left: "WiFi (802.11)", right: "Wireless LAN for computers and devices" },
                { left: "Bluetooth", right: "Short-range wireless for peripherals (mouse, headphones)" },
                { left: "Cellular", right: "Mobile data over carrier networks (4G, 5G)" },
                { left: "NFC", right: "Very short-range for payment and pairing" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What does mirroring/casting refer to in wireless displays?",
              options: [
                "Reflecting light",
                "Sending video/audio wirelessly to a projector or TV",
                "Making copies of files",
                "A network protocol"
              ],
              correctIndex: 1,
              explanation: "Mirroring/casting sends audio and video from a device to a wireless display or speaker."
            },
            {
              type: "true-false",
              statement: "Bluetooth and WiFi operate on the same frequency and can interfere with each other.",
              correct: true,
              explanation: "Both operate on 2.4 GHz (though WiFi also uses 5 GHz) and can cause interference."
            }
          ]
        },
        {
          id: "obj2u2-l4",
          title: "Peripherals & I/O Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "Which connector is the modern universal standard for charging and data?",
              options: ["USB-A", "USB-C", "Micro USB", "Lightning"],
              correctIndex: 1
            },
            {
              type: "type-answer",
              question: "Name a connector used for video output.",
              accepted: ["HDMI", "DisplayPort", "VGA", "DVI"],
              hint: "Used to display images",
              explanation: "HDMI, DisplayPort, VGA, and DVI are all video connectors."
            }
          ]
        }
      ]
    },

    {
      id: "obj2-unit3",
      title: "2.6-2.9 - Networks & Cloud",
      description: "Virtualization, cloud services, networking concepts, and wireless networks",
      accent: "orange",
      lessons: [
        {
          id: "obj2u3-l1",
          title: "Virtualization & Cloud Computing",
          icon: "☁️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match cloud service model to its characteristics",
              pairs: [
                { left: "IaaS", right: "Infrastructure as a Service - rent compute/storage resources" },
                { left: "PaaS", right: "Platform as a Service - development environment in the cloud" },
                { left: "SaaS", right: "Software as a Service - applications run in cloud (Gmail, Office365)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is a hypervisor used for in virtualization?",
              options: [
                "To speed up internet",
                "To manage multiple virtual machines on one physical server",
                "To encrypt data",
                "To backup files"
              ],
              correctIndex: 1,
              explanation: "A hypervisor allows one physical server to run multiple guest operating systems simultaneously."
            },
            {
              type: "true-false",
              statement: "A guest OS in a virtual machine is completely separate from the host OS.",
              correct: true,
              explanation: "Virtual machines are isolated; a crash in one guest doesn't affect others or the host."
            },
            {
              type: "multiple-choice",
              question: "What is the advantage of cloud deployment compared to on-premises?",
              options: [
                "No maintenance needed",
                "Accessibility, scalability, and no local hardware management",
                "Always cheaper",
                "No security concerns"
              ],
              correctIndex: 1,
              explanation: "Cloud provides accessibility from anywhere, scales easily, but users still share security responsibility."
            }
          ]
        },
        {
          id: "obj2u3-l2",
          title: "Network Fundamentals",
          icon: "🌐",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match network device to its function",
              pairs: [
                { left: "Modem", right: "Converts ISP signal to usable internet connection" },
                { left: "Router", right: "Routes traffic between networks and provides WiFi" },
                { left: "Switch", right: "Connects devices on same LAN with wired connections" },
                { left: "Access Point", right: "Provides wireless connectivity on a network" },
                { left: "Firewall", right: "Controls and monitors incoming/outgoing traffic" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is an IP address used for?",
              options: [
                "To identify a device on a network",
                "To speed up internet",
                "To prevent viruses",
                "To encrypt data"
              ],
              correctIndex: 0,
              explanation: "An IP address (IPv4 or IPv6) uniquely identifies a device on a network."
            },
            {
              type: "multiple-choice",
              question: "What is the difference between LAN and WAN?",
              options: [
                "LAN is faster than WAN",
                "LAN is local/small, WAN is wide/large geographic area",
                "They are the same thing",
                "LAN requires WiFi"
              ],
              correctIndex: 1,
              explanation: "LAN (Local Area Network) covers a small area; WAN (Wide Area Network) spans large distances."
            },
            {
              type: "true-false",
              statement: "A MAC address identifies a device's physical network adapter.",
              correct: true,
              explanation: "MAC addresses are hardware identifiers; IP addresses are software/network identifiers."
            },
            {
              type: "multi-select",
              question: "Which are network services?",
              options: ["DHCP", "DNS", "HTTP", "HTTPS", "SMTP"],
              correctIndices: [0, 1, 2, 3, 4],
              explanation: "All are network services: DHCP assigns IPs, DNS resolves names, HTTP/HTTPS for web, SMTP for email."
            }
          ]
        },
        {
          id: "obj2u3-l3",
          title: "Internet Access & Wireless Networks",
          icon: "📶",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match internet service type to its characteristics",
              pairs: [
                { left: "Fiber", right: "Fastest option; glass fiber cables carrying light signals" },
                { left: "Cable", right: "Fast; uses TV cable infrastructure" },
                { left: "DSL", right: "Moderate speed; uses telephone lines" },
                { left: "Satellite", right: "Available everywhere; high latency" },
                { left: "Cellular", right: "Mobile data via cellular networks (4G/5G)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What are the WiFi bands commonly used?",
              options: [
                "2.4 GHz and 5 GHz (and newer 6 GHz)",
                "100 MHz and 200 MHz",
                "Only 2.4 GHz",
                "10 GHz and 20 GHz"
              ],
              correctIndex: 0,
              explanation: "2.4 GHz has better range; 5 GHz has higher speed; 6 GHz is the newest band."
            },
            {
              type: "true-false",
              statement: "Interference from microwaves and cordless phones affects 2.4 GHz WiFi.",
              correct: true,
              explanation: "The 2.4 GHz band is congested with many devices causing potential interference."
            },
            {
              type: "multiple-choice",
              question: "What does 802.11ax refer to?",
              options: ["WiFi 5", "WiFi 6", "WiFi 4", "WiFi 7"],
              correctIndex: 1,
              explanation: "802.11ax is WiFi 6 (WiFi 6E is WiFi 6 with 6 GHz band). 802.11ac is WiFi 5."
            }
          ]
        },
        {
          id: "obj2u3-l4",
          title: "Networks & Cloud Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "What service model allows running applications in the cloud?",
              accepted: ["SaaS", "PaaS", "IaaS"],
              hint: "Think of Gmail or Office 365",
              explanation: "SaaS is Software as a Service where applications run in the cloud."
            },
            {
              type: "multiple-choice",
              question: "Which device converts your ISP connection to WiFi?",
              options: ["Modem", "Router", "Switch", "Firewall"],
              correctIndex: 1
            }
          ]
        }
      ]
    },

    // ===== OBJECTIVE 3: APPLICATIONS & SOFTWARE (3.0 - 18%) =====
    {
      id: "obj3-unit1",
      title: "3.1-3.2 - Operating Systems",
      description: "OS components, purpose, and types",
      accent: "purple",
      lessons: [
        {
          id: "obj3u1-l1",
          title: "OS Components & Functionality",
          icon: "⚙️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match OS component to its function",
              pairs: [
                { left: "Filesystem", right: "Organizes how files are stored and retrieved" },
                { left: "Device Drivers", right: "Enable communication between OS and hardware" },
                { left: "Services", right: "Background processes providing system functionality" },
                { left: "Kernel", right: "Core of OS managing hardware and resources" },
                { left: "Shell", right: "Command interface for user interaction (CLI/GUI)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is the purpose of file permissions in an OS?",
              options: [
                "To increase file size",
                "To control who can read, write, or execute files",
                "To encrypt files",
                "To speed up file access"
              ],
              correctIndex: 1,
              explanation: "File permissions restrict file access based on user rights and security policies."
            },
            {
              type: "true-false",
              statement: "A device driver allows the OS to communicate with hardware like printers.",
              correct: true,
              explanation: "Drivers translate OS commands into hardware-specific instructions."
            },
            {
              type: "multiple-choice",
              question: "What is the CLI (Command Line Interface)?",
              options: [
                "A type of malware",
                "Text-based interface for entering commands",
                "A graphics card",
                "A network protocol"
              ],
              correctIndex: 1,
              explanation: "CLI (Command Line Interface) allows users to interact with OS using text commands (like cmd.exe)."
            }
          ]
        },
        {
          id: "obj3u1-l2",
          title: "Operating System Types",
          icon: "🖥️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match OS type to example systems",
              pairs: [
                { left: "Desktop/Laptop", right: "Windows, macOS, Linux" },
                { left: "Mobile", right: "iOS, Android, Windows Phone" },
                { left: "Server", right: "Windows Server, Linux Server, Unix" },
                { left: "Embedded", right: "IoT devices, car systems, smartwatches" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is the main difference between a desktop OS and a server OS?",
              options: [
                "Server OS is faster",
                "Desktop OS handles multiple users; Server OS is single-user only",
                "Server OS handles multiple users/services; Desktop OS for single user",
                "There is no difference"
              ],
              correctIndex: 2,
              explanation: "Server OS manages resources for many simultaneous users; Desktop OS optimizes for single user."
            },
            {
              type: "true-false",
              statement: "Mobile operating systems like iOS and Android are similar to desktop OS.",
              correct: true,
              explanation: "Both are operating systems but optimized for different hardware and user interaction."
            },
            {
              type: "multi-select",
              question: "Which are examples of embedded operating systems?",
              options: [
                "Windows 11",
                "Real-time OS in medical devices",
                "IoT device firmware",
                "Linux Server",
                "Firmware in routers"
              ],
              correctIndices: [1, 2, 4],
              explanation: "Embedded systems run specialized firmware. Windows and Linux Server are not embedded."
            }
          ]
        },
        {
          id: "obj3u1-l3",
          title: "OS Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "What component organizes files on a storage drive?",
              accepted: ["filesystem"],
              hint: "Hierarchical structure",
              explanation: "Filesystem manages directory structure and file organization."
            },
            {
              type: "multiple-choice",
              question: "What allows OS to communicate with a printer?",
              options: ["Kernel", "Driver", "Service", "CLI"],
              correctIndex: 1
            }
          ]
        }
      ]
    },

    {
      id: "obj3-unit2",
      title: "3.3-3.5 - Software & Productivity",
      description: "Productivity software, browsers, and AI applications",
      accent: "purple",
      lessons: [
        {
          id: "obj3u2-l1",
          title: "Productivity & Collaboration Software",
          icon: "📊",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match software type to common examples",
              pairs: [
                { left: "Word Processing", right: "Microsoft Word, Google Docs, LibreOffice Writer" },
                { left: "Spreadsheet", right: "Excel, Google Sheets, LibreOffice Calc" },
                { left: "Presentation", right: "PowerPoint, Google Slides, Keynote" },
                { left: "Email", right: "Outlook, Gmail, Thunderbird" },
                { left: "Video Conferencing", right: "Zoom, Teams, Google Meet" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is instant messaging (IM) primarily used for?",
              options: [
                "Large file transfers",
                "Real-time text communication",
                "Video only",
                "Email replacement"
              ],
              correctIndex: 1,
              explanation: "Instant messaging provides quick, real-time text communication (Slack, Teams chat, etc.)."
            },
            {
              type: "true-false",
              statement: "Remote support tools allow technicians to access user computers remotely.",
              correct: true,
              explanation: "Tools like TeamViewer and AnyDesk enable remote desktop access for support."
            }
          ]
        },
        {
          id: "obj3u2-l2",
          title: "Web Browsers & Configuration",
          icon: "🌐",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match browser feature to its purpose",
              pairs: [
                { left: "Private Browsing", right: "Doesn't save history, cookies, or site data" },
                { left: "Extensions", right: "Add-ons that extend browser functionality" },
                { left: "Pop-up Blocker", right: "Prevents unwanted pop-up windows" },
                { left: "Password Manager", right: "Securely stores and auto-fills passwords" },
                { left: "Cache", right: "Stores web page data for faster loading" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why is clearing browser cache useful?",
              options: [
                "To improve internet speed only",
                "To free storage space and remove outdated site data",
                "To prevent cookies",
                "It's not useful"
              ],
              correctIndex: 1,
              explanation: "Cache stores website data; clearing it frees space and removes potentially outdated content."
            },
            {
              type: "true-false",
              statement: "Browser bookmarks are stored only locally and can't sync across devices.",
              correct: false,
              explanation: "Modern browsers can sync bookmarks across devices when signed in."
            }
          ]
        },
        {
          id: "obj3u2-l3",
          title: "AI & Modern Applications",
          icon: "🤖",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match AI application to its use",
              pairs: [
                { left: "Chatbots", right: "Automated customer support and Q&A" },
                { left: "Generative AI", right: "Creates content (text, images, code)" },
                { left: "Virtual Assistants", right: "Voice-activated helpers (Alexa, Siri)" },
                { left: "Predictive Features", right: "Suggests next actions or content" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What can generative AI be used for?",
              options: [
                "Only image generation",
                "Text, code, images, and content creation",
                "Virus detection only",
                "Nothing practical"
              ],
              correctIndex: 1,
              explanation: "Generative AI creates new content in various forms based on training."
            }
          ]
        },
        {
          id: "obj3u2-l4",
          title: "Software Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "Name one example of productivity software.",
              accepted: ["word", "excel", "powerpoint", "google docs", "sheets"],
              hint: "Used for work and documents",
              explanation: "Word, Excel, PowerPoint, Google Docs/Sheets are productivity software."
            },
            {
              type: "multiple-choice",
              question: "What do browser extensions do?",
              options: ["Speed up internet", "Add features to browser", "Fix malware", "Increase RAM"],
              correctIndex: 1
            }
          ]
        }
      ]
    },

    // ===== OBJECTIVE 4: SOFTWARE DEVELOPMENT (4.0 - 13%) =====
    {
      id: "obj4-unit1",
      title: "4.1-4.2 - Programming Basics",
      description: "Programming languages, data types, and variables",
      accent: "cyan",
      lessons: [
        {
          id: "obj4u1-l1",
          title: "Programming Languages",
          icon: "💻",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match language type to examples",
              pairs: [
                { left: "Interpreted/Scripting", right: "Python, JavaScript, Ruby, Bash" },
                { left: "Compiled", right: "C, C++, Java, Go, Rust" },
                { left: "Markup", right: "HTML, XML, Markdown" },
                { left: "Query", right: "SQL" },
                { left: "Assembly", right: "Low-level machine instructions" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What's the main difference between interpreted and compiled languages?",
              options: [
                "Interpreted is always faster",
                "Compiled converts to machine code before running; interpreted converts during execution",
                "They are identical",
                "Interpreted can't run on Windows"
              ],
              correctIndex: 1,
              explanation: "Compiled languages convert source code to executable before running. Interpreted languages convert at runtime."
            },
            {
              type: "true-false",
              statement: "HTML is considered a programming language.",
              correct: false,
              explanation: "HTML is markup language for structure; not a programming language for logic."
            },
            {
              type: "multiple-choice",
              question: "What is SQL primarily used for?",
              options: [
                "Web page styling",
                "Querying and managing databases",
                "Creating graphics",
                "Mobile app development"
              ],
              correctIndex: 1,
              explanation: "SQL (Structured Query Language) retrieves, inserts, updates, and manages database data."
            }
          ]
        },
        {
          id: "obj4u1-l2",
          title: "Data Types",
          icon: "📦",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match data type to example values",
              pairs: [
                { left: "Char", right: "Single character: 'A' or '#'" },
                { left: "String", right: "Text: 'Hello World'" },
                { left: "Integer", right: "Whole numbers: 42, -7, 0" },
                { left: "Float", right: "Decimal numbers: 3.14, -2.5" },
                { left: "Boolean", right: "True or False" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Which data type would you use for a person's height in feet?",
              options: ["Char", "Integer", "Float", "Boolean"],
              correctIndex: 2,
              explanation: "Float stores decimal numbers needed for measurements like 5.75 feet."
            },
            {
              type: "true-false",
              statement: "A string can contain numbers but they're treated as text.",
              correct: true,
              explanation: "A string '123' is different from integer 123. Strings are for text data."
            },
            {
              type: "multi-select",
              question: "Which are valid data type examples?",
              options: ["'42' as String", "42.5 as Float", "True as Boolean", "12.3 as Integer", "A as Char"],
              correctIndices: [0, 1, 2, 4],
              explanation: "'42' in quotes is string, 42.5 is float, True is boolean, A is char. 12.3 can't be integer."
            }
          ]
        },
        {
          id: "obj4u1-l3",
          title: "Variables & Constants",
          icon: "🔤",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is a variable in programming?",
              options: [
                "A fixed number in code",
                "A named container for data that can change",
                "A type of error",
                "Not used anymore"
              ],
              correctIndex: 1,
              explanation: "Variables store data values that can be modified during program execution."
            },
            {
              type: "true-false",
              statement: "A constant's value can be changed after initialization.",
              correct: false,
              explanation: "Constants are immutable; their value cannot change once set."
            },
            {
              type: "multiple-choice",
              question: "Why use constants instead of hardcoding values?",
              options: [
                "Faster execution",
                "Easier maintenance and changing values in one place",
                "Prevents malware",
                "No real advantage"
              ],
              correctIndex: 1,
              explanation: "Constants make code maintainable by centralizing values that may need to change."
            }
          ]
        },
        {
          id: "obj4u1-l4",
          title: "Programming Basics Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "Name a compiled programming language.",
              accepted: ["C", "C++", "Java", "Go", "Rust"],
              hint: "Converts before running",
              explanation: "C, C++, Java, Go, and Rust are compiled languages."
            },
            {
              type: "multiple-choice",
              question: "What data type stores decimal numbers?",
              options: ["Char", "Integer", "Float", "Boolean"],
              correctIndex: 2
            }
          ]
        }
      ]
    },

    {
      id: "obj4-unit2",
      title: "4.3-4.4 - Programming Concepts",
      description: "Functions, data structures, and logic",
      accent: "cyan",
      lessons: [
        {
          id: "obj4u2-l1",
          title: "Functions & Methods",
          icon: "⚙️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match function concept to definition",
              pairs: [
                { left: "Function", right: "Reusable block of code performing a task" },
                { left: "Method", right: "Function belonging to an object or class" },
                { left: "Parameter", right: "Input value passed to a function" },
                { left: "Return Value", right: "Output sent back from a function" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why use functions instead of repeating code?",
              options: [
                "Functions are faster",
                "Reusability, easier maintenance, reduces errors",
                "Functions are required in all languages",
                "No real advantage"
              ],
              correctIndex: 1,
              explanation: "Functions eliminate code duplication and make programs easier to maintain and debug."
            },
            {
              type: "true-false",
              statement: "A function can return multiple values using arrays or objects.",
              correct: true,
              explanation: "Many languages allow functions to return complex data structures."
            }
          ]
        },
        {
          id: "obj4u2-l2",
          title: "Data Structures & Arrays",
          icon: "📊",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is an array in programming?",
              options: [
                "A single value",
                "Ordered collection of elements accessed by index",
                "A type of loop",
                "Encrypts data"
              ],
              correctIndex: 1,
              explanation: "Arrays store multiple values in order, accessed by numeric position (usually starting at 0)."
            },
            {
              type: "true-false",
              statement: "Most programming languages use zero-based indexing for arrays.",
              correct: true,
              explanation: "The first element is at index 0, second at index 1, etc."
            },
            {
              type: "multiple-choice",
              question: "What is an object in programming?",
              options: [
                "An array with no data",
                "Collection of properties and methods",
                "A type of virus",
                "Only used in web design"
              ],
              correctIndex: 1,
              explanation: "Objects combine data (properties) and functionality (methods)."
            }
          ]
        },
        {
          id: "obj4u2-l3",
          title: "Logic & Control Flow",
          icon: "🔀",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match control structure to its purpose",
              pairs: [
                { left: "If/Else", right: "Execute different code based on condition" },
                { left: "For Loop", right: "Repeat code a set number of times" },
                { left: "While Loop", right: "Repeat code while condition is true" },
                { left: "Switch", right: "Execute code based on different cases" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is pseudocode used for?",
              options: [
                "Actual programming language",
                "Planning algorithm logic before coding",
                "Encrypting code",
                "Testing malware"
              ],
              correctIndex: 1,
              explanation: "Pseudocode is informal text describing logic before writing actual code."
            },
            {
              type: "true-false",
              statement: "A flowchart uses diamonds to represent decision points.",
              correct: true,
              explanation: "Flowcharts use specific symbols: rectangles for processes, diamonds for decisions, arrows for flow."
            }
          ]
        },
        {
          id: "obj4u2-l4",
          title: "Programming Concepts Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "What do you call a function that belongs to an object?",
              accepted: ["method"],
              hint: "Object-oriented term",
              explanation: "A method is a function within or associated with a class/object."
            },
            {
              type: "multiple-choice",
              question: "What does an array store?",
              options: ["Single value", "Multiple ordered values", "Functions only", "Nothing"],
              correctIndex: 1
            }
          ]
        }
      ]
    },

    // ===== OBJECTIVE 5: DATA & DATABASES (5.0 - 13%) =====
    {
      id: "obj5-unit1",
      title: "5.1-5.2 - Data Concepts & Databases",
      description: "Data value, database concepts, and persistence",
      accent: "pink",
      lessons: [
        {
          id: "obj5u1-l1",
          title: "Data as an Asset",
          icon: "💎",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match data concept to description",
              pairs: [
                { left: "Data Analytics", right: "Analyzing data to find patterns and insights" },
                { left: "Big Data", right: "Very large datasets requiring special processing" },
                { left: "Data Monetization", right: "Generating revenue from data insights" },
                { left: "Data-Driven Decisions", right: "Making choices based on data analysis" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why is data valuable to modern organizations?",
              options: [
                "It takes up storage space",
                "Enables informed decisions and competitive advantage",
                "Only for big tech companies",
                "It's not valuable"
              ],
              correctIndex: 1,
              explanation: "Data drives business intelligence, customer understanding, and strategic decisions."
            },
            {
              type: "true-false",
              statement: "GDPR regulations protect personal data privacy.",
              correct: true,
              explanation: "GDPR (General Data Protection Regulation) gives individuals rights over personal data."
            },
            {
              type: "multi-select",
              question: "Which are examples of Personally Identifiable Information (PII)?",
              options: [
                "Social Security Number",
                "Email address",
                "Favorite color",
                "Home address",
                "Mother's maiden name"
              ],
              correctIndices: [0, 1, 3, 4],
              explanation: "PII identifies individuals. SSN, email, address, maiden name are PII. Favorite color is not."
            }
          ]
        },
        {
          id: "obj5u1-l2",
          title: "Database Concepts",
          icon: "🗄️",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is the main advantage of a database over a flat file?",
              options: [
                "Takes less space",
                "Allows complex queries and relationships",
                "Never fails",
                "Doesn't need backups"
              ],
              correctIndex: 1,
              explanation: "Databases enable querying, indexing, and relationships. Flat files are just stored text."
            },
            {
              type: "match-pairs",
              instruction: "Match database operation to purpose",
              pairs: [
                { left: "Create", right: "Add new data to database" },
                { left: "Query", right: "Retrieve specific data based on criteria" },
                { left: "Report", right: "Generate summaries and analyses" },
                { left: "Persist", right: "Store data permanently" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is a database record?",
              options: [
                "A table in database",
                "A row of data containing one complete entity",
                "A backup copy",
                "A query result"
              ],
              correctIndex: 1,
              explanation: "A record is a row containing all related data for one item."
            },
            {
              type: "true-false",
              statement: "Database availability means users can access data 24/7.",
              correct: true,
              explanation: "Databases should be available when needed by authorized users."
            }
          ]
        },
        {
          id: "obj5u1-l3",
          title: "Data Concepts Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "What is information that identifies an individual called?",
              accepted: ["PII", "personally identifiable information"],
              hint: "Protected by GDPR",
              explanation: "PII includes social security numbers, email addresses, and home addresses."
            },
            {
              type: "multiple-choice",
              question: "What is a database record?",
              options: ["Table", "Column", "Row", "Cell"],
              correctIndex: 2
            }
          ]
        }
      ]
    },

    {
      id: "obj5-unit2",
      title: "5.3-5.4 - Database Structures & Backups",
      description: "Relational/non-relational databases and backup strategies",
      accent: "pink",
      lessons: [
        {
          id: "obj5u2-l1",
          title: "Database Structures",
          icon: "🗂️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match data structure type to characteristics",
              pairs: [
                { left: "Structured", right: "Organized in tables with defined columns (SQL)" },
                { left: "Semi-Structured", right: "Some organization, flexible (JSON, XML)" },
                { left: "Unstructured", right: "No predefined format (images, videos, text)" },
                { left: "Relational", right: "Tables with relationships via keys" },
                { left: "Non-Relational", right: "Key-value, document stores (NoSQL)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is a primary key in a relational database?",
              options: [
                "A backup key",
                "Unique identifier for each record",
                "The most important column",
                "A password"
              ],
              correctIndex: 1,
              explanation: "Primary key uniquely identifies each record and prevents duplicates."
            },
            {
              type: "true-false",
              statement: "A foreign key creates relationships between tables.",
              correct: true,
              explanation: "Foreign keys link records in one table to another table's primary key."
            },
            {
              type: "multiple-choice",
              question: "What is a database schema?",
              options: [
                "The data itself",
                "The blueprint defining tables, columns, and relationships",
                "A backup copy",
                "An error message"
              ],
              correctIndex: 1,
              explanation: "Schema defines the structure and organization of a database."
            }
          ]
        },
        {
          id: "obj5u2-l2",
          title: "Backup & Recovery",
          icon: "💾",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match backup type to description",
              pairs: [
                { left: "Full Backup", right: "Complete copy of all data" },
                { left: "Incremental", right: "Only new/changed data since last backup" },
                { left: "Differential", right: "All changes since last full backup" },
                { left: "System Backup", right: "Entire OS and settings" },
                { left: "File Backup", right: "Specific files or folders" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Where should backup data be stored for safety?",
              options: [
                "Only on same computer",
                "Multiple locations including offsite/cloud",
                "Only in cloud",
                "Never backed up"
              ],
              correctIndex: 1,
              explanation: "Best practice: 3-2-1 rule (3 copies, 2 media types, 1 offsite location)."
            },
            {
              type: "true-false",
              statement: "A backup is useless without successful restore testing.",
              correct: true,
              explanation: "Regular restore tests verify backups are viable and data is recoverable."
            },
            {
              type: "multi-select",
              question: "What are cloud backup benefits?",
              options: [
                "Automatic scalability",
                "Access from anywhere",
                "No disaster risk",
                "Reduced hardware costs",
                "Always encrypted"
              ],
              correctIndices: [0, 1, 3],
              explanation: "Cloud scales automatically, is accessible remotely, reduces hardware. Still has risks and needs encryption verification."
            }
          ]
        },
        {
          id: "obj5u2-l3",
          title: "Database Structures Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "What uniquely identifies each database record?",
              accepted: ["primary key"],
              hint: "Prevents duplicates",
              explanation: "Primary key ensures each record is unique and identifiable."
            },
            {
              type: "multiple-choice",
              question: "Which backup includes only changes since the last full backup?",
              options: ["Full", "Incremental", "Differential", "System"],
              correctIndex: 2
            }
          ]
        }
      ]
    },

    // ===== OBJECTIVE 6: SECURITY (6.0 - 19%) =====
    {
      id: "obj6-unit1",
      title: "6.1-6.3 - Security Fundamentals",
      description: "CIA triad, authentication, passwords, and access control",
      accent: "red",
      lessons: [
        {
          id: "obj6u1-l1",
          title: "CIA Triad & Fundamentals",
          icon: "🔐",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match CIA component to definition",
              pairs: [
                { left: "Confidentiality", right: "Only authorized users access data" },
                { left: "Integrity", right: "Data accuracy and hasn't been altered" },
                { left: "Availability", right: "Authorized users can access when needed" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Which CIA principle is violated if financial records are modified?",
              options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
              correctIndex: 1,
              explanation: "Integrity ensures data hasn't been altered. Modified data violates integrity."
            },
            {
              type: "true-false",
              statement: "Availability means keeping data secret from everyone.",
              correct: false,
              explanation: "Availability means authorized users CAN access data. Confidentiality keeps it secret."
            },
            {
              type: "match-pairs",
              instruction: "Match security concept to meaning",
              pairs: [
                { left: "Least Privilege", right: "Users get only minimum permissions needed" },
                { left: "Logging", right: "Recording user activities for audits" },
                { left: "Single Sign-On", right: "One authentication for multiple systems" }
              ]
            }
          ]
        },
        {
          id: "obj6u1-l2",
          title: "Authentication, Authorization & Accounting",
          icon: "👤",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match AAA component to definition",
              pairs: [
                { left: "Authentication", right: "Verify identity (who are you?)" },
                { left: "Authorization", right: "Grant permissions (what can you access?)" },
                { left: "Accounting", right: "Log activities for auditing" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Which occurs when system verifies your password?",
              options: ["Authorization", "Authentication", "Accounting", "Encryption"],
              correctIndex: 1,
              explanation: "Authentication verifies you are who you claim to be."
            },
            {
              type: "multiple-choice",
              question: "What is MFA (Multi-Factor Authentication)?",
              options: [
                "Using same password everywhere",
                "Requiring multiple authentication factors",
                "A type of malware",
                "Backup authentication only"
              ],
              correctIndex: 1,
              explanation: "MFA requires something you know (password) AND something you have (phone) or are (fingerprint)."
            },
            {
              type: "true-false",
              statement: "SSO means using same password for all systems.",
              correct: false,
              explanation: "SSO uses one authentication for multiple systems but doesn't mean identical passwords everywhere."
            }
          ]
        },
        {
          id: "obj6u1-l3",
          title: "Password Security",
          icon: "🔑",
          exercises: [
            {
              type: "multiple-choice",
              question: "What makes a password secure?",
              options: [
                "Easy to remember",
                "Long with mixed character types",
                "Contains your name",
                "Same for all accounts"
              ],
              correctIndex: 1,
              explanation: "Strong passwords are 8+ characters with uppercase, lowercase, numbers, and symbols."
            },
            {
              type: "multi-select",
              question: "Which are password best practices?",
              options: [
                "Reuse passwords across sites",
                "Change regularly",
                "Never share with anyone",
                "Use passphrases with special characters",
                "Write on sticky notes"
              ],
              correctIndices: [1, 2, 3],
              explanation: "Best practices: unique strong passwords, regular changes, never share. Don't reuse or write them down."
            },
            {
              type: "true-false",
              statement: "A passphrase like 'correct-horse-battery' is effective for security.",
              correct: true,
              explanation: "Passphrases are memorable yet secure when combining unrelated words."
            },
            {
              type: "fill-blank",
              prompt: "A software tool that securely stores passwords is called a password ____.",
              accepted: ["manager"],
              hint: "Helps manage many passwords",
              explanation: "Password managers securely store and auto-fill login credentials."
            }
          ]
        },
        {
          id: "obj6u1-l4",
          title: "Security Fundamentals Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "What does CIA stand for in security?",
              accepted: ["Confidentiality Integrity Availability"],
              hint: "Three pillars of information security",
              explanation: "CIA Triad represents the three core security principles."
            },
            {
              type: "multiple-choice",
              question: "What must MFA include?",
              options: ["Two passwords", "Multiple authentication factors", "Biometrics only", "USB keys only"],
              correctIndex: 1
            }
          ]
        }
      ]
    },

    {
      id: "obj6-unit2",
      title: "6.2 - Device & Software Security",
      description: "Malware, antivirus, firewalls, patching, and safe practices",
      accent: "red",
      lessons: [
        {
          id: "obj6u2-l1",
          title: "Malware Types & Protection",
          icon: "🛡️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match malware type to description",
              pairs: [
                { left: "Virus", right: "Replicates by attaching to files" },
                { left: "Worm", right: "Spreads independently through networks" },
                { left: "Trojan", right: "Disguises as legitimate software" },
                { left: "Ransomware", right: "Encrypts files demanding payment" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is antivirus software's primary function?",
              options: [
                "Increase speed",
                "Detect and remove malicious software",
                "Block ads",
                "Backup data"
              ],
              correctIndex: 1,
              explanation: "Antivirus scans for and removes viruses, malware, and other threats."
            },
            {
              type: "true-false",
              statement: "It's safe to download from untrusted sources if you have antivirus.",
              correct: false,
              explanation: "Malware can evade detection. Always download from official sources."
            },
            {
              type: "multi-select",
              question: "Which are safe software sourcing practices?",
              options: [
                "Download from official websites",
                "Use trusted app stores",
                "Download from random forums",
                "Verify digital signatures",
                "Use pirated software"
              ],
              correctIndices: [0, 1, 3],
              explanation: "Official sources and app stores are safe. Verify authenticity. Avoid pirated software."
            }
          ]
        },
        {
          id: "obj6u2-l2",
          title: "Firewalls & Patching",
          icon: "🔒",
          exercises: [
            {
              type: "multiple-choice",
              question: "What does a firewall do?",
              options: [
                "Prevents all internet access",
                "Monitors and controls network traffic",
                "Encrypts emails",
                "Removes viruses"
              ],
              correctIndex: 1,
              explanation: "Firewalls filter traffic based on rules, blocking unauthorized access."
            },
            {
              type: "true-false",
              statement: "Software patching fixes security vulnerabilities before exploitation.",
              correct: true,
              explanation: "Patches close security holes attackers could exploit."
            },
            {
              type: "multiple-choice",
              question: "Why is regular patching critical?",
              options: [
                "Adds features only",
                "Fixes security vulnerabilities",
                "Increases performance",
                "Optional"
              ],
              correctIndex: 1,
              explanation: "Patches patch security flaws that could be exploited if left unpatched."
            },
            {
              type: "fill-blank",
              prompt: "A ____ is software protecting systems from unauthorized access and monitoring traffic.",
              accepted: ["firewall"],
              hint: "Hardware or software barrier",
              explanation: "Firewalls are security barriers controlling what traffic enters/exits networks."
            }
          ]
        },
        {
          id: "obj6u2-l3",
          title: "Device & Social Engineering",
          icon: "📱",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match social engineering tactic to example",
              pairs: [
                { left: "Phishing", right: "Fraudulent emails pretending to be legitimate" },
                { left: "Pretexting", right: "Creating false scenario to extract information" },
                { left: "Baiting", right: "Offering something enticing to lure victims" },
                { left: "Tailgating", right: "Following authorized person through secured door" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is social engineering?",
              options: [
                "A computer virus",
                "Psychological manipulation to divulge information",
                "Antivirus software",
                "A network protocol"
              ],
              correctIndex: 1,
              explanation: "Social engineering exploits human psychology rather than technical vulnerabilities."
            },
            {
              type: "true-false",
              statement: "Legitimate companies never ask for passwords via email.",
              correct: true,
              explanation: "This is always a phishing tactic. Real companies never request passwords via email."
            },
            {
              type: "multi-select",
              question: "What are phishing email red flags?",
              options: [
                "Urgent language",
                "Requests for passwords/financial info",
                "Suspicious links/attachments",
                "Poor spelling",
                "Official logos"
              ],
              correctIndices: [0, 1, 2, 3],
              explanation: "Urgency, requests for info, suspicious links, and errors are red flags. Logos can be forged."
            }
          ]
        },
        {
          id: "obj6u2-l4",
          title: "Device Security Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "What malware pretends to be legitimate software?",
              accepted: ["Trojan", "Trojan horse"],
              hint: "Named after Greek story",
              explanation: "Trojans disguise as legitimate software to trick installation."
            },
            {
              type: "multiple-choice",
              question: "Why is patching important for security?",
              options: ["Speed only", "Close security vulnerabilities", "Add features", "Not important"],
              correctIndex: 1
            }
          ]
        }
      ]
    },

    {
      id: "obj6-unit3",
      title: "6.4-6.5 - Encryption & Wireless Security",
      description: "Data encryption, HTTPS, VPN, and WiFi security",
      accent: "red",
      lessons: [
        {
          id: "obj6u3-l1",
          title: "Encryption & Data Protection",
          icon: "🔐",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match encryption concept to meaning",
              pairs: [
                { left: "Plaintext", right: "Unencrypted, readable data" },
                { left: "Ciphertext", right: "Encrypted, unreadable data" },
                { left: "Data at Rest", right: "Stored data on devices" },
                { left: "Data in Transit", right: "Data moving over networks" },
                { left: "HTTPS", right: "Secure encrypted web protocol" },
                { left: "VPN", right: "Virtual Private Network for encryption" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why encrypt data in transit?",
              options: [
                "To make downloads slower",
                "Prevent interception and eavesdropping",
                "Use less bandwidth",
                "Not important"
              ],
              correctIndex: 1,
              explanation: "Encryption protects data traveling over networks from being intercepted."
            },
            {
              type: "true-false",
              statement: "HTTPS encrypts data between browser and website.",
              correct: true,
              explanation: "HTTPS uses SSL/TLS encryption for secure connections."
            },
            {
              type: "multiple-choice",
              question: "What does a VPN do?",
              options: [
                "Speed up internet",
                "Create encrypted tunnel for secure remote connections",
                "Block all ads",
                "Store data"
              ],
              correctIndex: 1,
              explanation: "VPNs encrypt all traffic for secure remote access and privacy."
            }
          ]
        },
        {
          id: "obj6u3-l2",
          title: "Certificates & Secure Browsing",
          icon: "🌐",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match certificate concept to meaning",
              pairs: [
                { left: "SSL/TLS Certificate", right: "Encrypts connection and verifies identity" },
                { left: "Expired Certificate", right: "No longer valid; security risk" },
                { left: "Self-Signed", right: "Not verified by trusted authority" },
                { left: "Certificate Authority", right: "Issues trusted digital certificates" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What does a lock icon in browser indicate?",
              options: [
                "Slow connection",
                "Secure HTTPS with valid certificate",
                "Website is popular",
                "Data is backed up"
              ],
              correctIndex: 1,
              explanation: "Lock icon means connection is encrypted and certificate is valid."
            },
            {
              type: "true-false",
              statement: "Trust websites with expired SSL certificates.",
              correct: false,
              explanation: "Expired certificates indicate possible compromise. Avoid entering sensitive data."
            },
            {
              type: "multi-select",
              question: "Which are safe browsing practices?",
              options: [
                "Look for HTTPS and lock",
                "Verify URLs before clicking",
                "Avoid public WiFi for sensitive transactions",
                "Click email links to verify",
                "Keep browser updated"
              ],
              correctIndices: [0, 1, 2, 4],
              explanation: "Check HTTPS, verify URLs, use secure networks, update browser. Don't click suspicious links."
            }
          ]
        },
        {
          id: "obj6u3-l3",
          title: "Wireless Network Security",
          icon: "📡",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match WiFi standard to security level",
              pairs: [
                { left: "WEP", right: "Weak (outdated, avoid)" },
                { left: "WPA", right: "Better security" },
                { left: "WPA2", right: "Strong standard" },
                { left: "WPA3", right: "Latest, most secure" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why change default WiFi password?",
              options: [
                "Make it faster",
                "Prevent unauthorized access",
                "Not necessary",
                "Increase signal"
              ],
              correctIndex: 1,
              explanation: "Default passwords are publicly known; changing them is critical."
            },
            {
              type: "true-false",
              statement: "Hiding WiFi SSID provides complete security.",
              correct: false,
              explanation: "Hiding SSID adds obscurity but isn't complete security. Encryption matters more."
            },
            {
              type: "multi-select",
              question: "Which are WiFi security best practices?",
              options: [
                "Use WPA2 or WPA3",
                "Change default password",
                "Disable WPS",
                "Use default SSID",
                "Broadcast SSID openly"
              ],
              correctIndices: [0, 1, 2],
              explanation: "Use strong encryption, change defaults, disable vulnerable features. Keep SSID practices flexible."
            },
            {
              type: "fill-blank",
              prompt: "Your WiFi network name is called the ____.",
              accepted: ["SSID"],
              hint: "Network name you see when connecting",
              explanation: "SSID (Service Set Identifier) is your wireless network name."
            }
          ]
        },
        {
          id: "obj6u3-l4",
          title: "Encryption & Wireless Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "type-answer",
              question: "What protocol encrypts web connections?",
              accepted: ["HTTPS", "SSL", "TLS", "SSL/TLS"],
              hint: "Secure web protocol",
              explanation: "HTTPS uses SSL/TLS encryption for secure web connections."
            },
            {
              type: "multiple-choice",
              question: "What is the most secure WiFi standard?",
              options: ["WEP", "WPA", "WPA2", "WPA3"],
              correctIndex: 3
            }
          ]
        }
      ]
    }
  ]
};

/* If you're building something other than a language course, the same
   three exercise types work fine for any subject — just change the
   question text, options, and accepted answers. For example, a history
   course lesson might look like:

   {
     id: "h1-l1",
     title: "The French Revolution",
     icon: "📜",
     exercises: [
       {
         type: "multiple-choice",
         question: "In what year did the French Revolution begin?",
         options: ["1776", "1789", "1804", "1815"],
         correctIndex: 1
       }
     ]
   }
*/
/*
      title: "Hardware & Basic IT Concepts",
      description: "Essential hardware components, measurements, and IT terminology",
      accent: "blue",
      lessons: [
        {
          id: "u1-l1",
          title: "Hardware Components & Acronyms",
          icon: "🖥️",
          exercises: [
            {
              type: "multiple-choice",
              question: "What does CPU stand for?",
              options: ["Central Processing Unit", "Computer Processing Unit", "Central Processor Utility", "Core Processing Unit"],
              correctIndex: 0,
              explanation: "CPU stands for Central Processing Unit, the main component that executes instructions."
            },
            {
              type: "match-pairs",
              instruction: "Match each component acronym to its full name",
              pairs: [
                { left: "RAM", right: "Random Access Memory" },
                { left: "SSD", right: "Solid State Drive" },
                { left: "HDD", right: "Hard Disk Drive" },
                { left: "GPU", right: "Graphics Processing Unit" },
                { left: "PSU", right: "Power Supply Unit" },
                { left: "BIOS", right: "Basic Input/Output System" }
              ]
            },
            {
              type: "true-false",
              statement: "RAM is a form of permanent storage that retains data when powered off.",
              correct: false,
              explanation: "RAM is volatile memory; it only holds data while the computer is powered on."
            },
            {
              type: "multi-select",
              question: "Which of the following are input devices?",
              options: ["Monitor", "Keyboard", "Mouse", "Printer", "Microphone"],
              correctIndices: [1, 2, 4],
              explanation: "Input devices send data TO the computer. Keyboard, Mouse, and Microphone are input devices. Monitor and Printer are output devices."
            },
            {
              type: "fill-blank",
              prompt: "The ____ is the primary circuit board that connects all components.",
              accepted: ["motherboard"],
              hint: "It's the main board in your computer",
              explanation: "The motherboard serves as the central hub connecting the CPU, RAM, storage, and all other components."
            }
          ]
        },
        {
          id: "u1-l2",
          title: "Units of Measurement",
          icon: "📏",
          exercises: [
            {
              type: "multiple-choice",
              question: "How many bytes are in a kilobyte (KB)?",
              options: ["100", "1,000", "1,024", "1,000,000"],
              correctIndex: 2,
              explanation: "A kilobyte (KB) = 1,024 bytes. Note: technically 1,000 bytes in decimal, but computing uses 1,024 (binary)."
            },
            {
              type: "fill-blank",
              prompt: "1 GB = ____ MB",
              accepted: ["1024"],
              hint: "It's similar to the KB to byte ratio",
              explanation: "1 Gigabyte (GB) = 1,024 Megabytes (MB) in binary measurement."
            },
            {
              type: "match-pairs",
              instruction: "Match each storage unit to its equivalent size",
              pairs: [
                { left: "1 MB", right: "1,024 KB" },
                { left: "1 GB", right: "1,024 MB" },
                { left: "1 TB", right: "1,024 GB" },
                { left: "1 KB", right: "1,024 Bytes" }
              ]
            },
            {
              type: "multiple-choice",
              question: "In networking, what does Mbps stand for?",
              options: ["Megabits per second", "Megabytes per second", "Megabit processing speed", "Memory bits per second"],
              correctIndex: 0,
              explanation: "Mbps = Megabits per second. Note: 'bits' not 'bytes' - this is commonly used for bandwidth/speed measurements."
            },
            {
              type: "type-answer",
              question: "What is the acronym for hertz, the unit measuring processor speed?",
              accepted: ["ghz", "GHz", "MHz", "mhz"],
              hint: "Modern CPUs run at several __ per second",
              explanation: "GHz (Gigahertz) measures CPU clock speed. 1 GHz = 1 billion cycles per second."
            }
          ]
        },
        {
          id: "u1-l3",
          title: "Peripherals & I/O Interfaces",
          icon: "🔌",
          exercises: [
            {
              type: "multiple-choice",
              question: "Which of these is the newest universal connector standard?",
              options: ["USB 2.0", "USB-C", "FireWire", "Parallel Port"],
              correctIndex: 1,
              explanation: "USB-C is the modern universal connector supporting high speed and power delivery."
            },
            {
              type: "match-pairs",
              instruction: "Match each interface to its typical use",
              pairs: [
                { left: "USB", right: "Universal peripheral connection" },
                { left: "HDMI", right: "Video and audio output" },
                { left: "Ethernet", right: "Network connection" },
                { left: "3.5mm jack", right: "Audio input/output" },
                { left: "DisplayPort", right: "High-bandwidth video display" }
              ]
            },
            {
              type: "multi-select",
              question: "Which are examples of external peripherals?",
              options: ["Mouse", "Motherboard", "Monitor", "RAM", "Printer", "Webcam"],
              correctIndices: [0, 2, 4, 5],
              explanation: "External peripherals connect outside the case. RAM is internal. Monitor, Mouse, Printer, and Webcam are all external."
            },
            {
              type: "true-false",
              statement: "Thunderbolt is a standard developed by Intel that supports higher bandwidth than USB 3.0.",
              correct: true,
              explanation: "Thunderbolt provides significantly higher data transfer speeds than USB 3.0 and is used in high-performance applications."
            },
            {
              type: "type-answer",
              question: "What does the acronym VGA stand for?",
              accepted: ["Video Graphics Array", "video graphics array"],
              hint: "It's an older video connection standard",
              explanation: "VGA (Video Graphics Array) was a common analog video connector, largely replaced by HDMI and DisplayPort."
            }
          ]
        },
        {
          id: "u1-l4",
          title: "Common IT Acronyms",
          icon: "🔤",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each IT acronym to its meaning",
              pairs: [
                { left: "OS", right: "Operating System" },
                { left: "BIOS", right: "Basic Input/Output System" },
                { left: "UEFI", right: "Unified Extensible Firmware Interface" },
                { left: "CMOS", right: "Complementary Metal-Oxide Semiconductor" },
                { left: "POST", right: "Power-On Self Test" },
              ]
            },
            {
              type: "multiple-choice",
              question: "What does BIOS do when you first power on your computer?",
              options: ["Loads the operating system", "Runs a Power-On Self Test to check hardware", "Manages network connections", "Updates software drivers"],
              correctIndex: 1,
              explanation: "BIOS performs POST to verify that all hardware components are functioning before the OS loads."
            },
            {
              type: "multi-select",
              question: "Which of these are storage-related acronyms?",
              options: ["SSD", "HDD", "RAM", "NAS", "SAN"],
              correctIndices: [0, 1, 3, 4],
              explanation: "SSD, HDD, NAS (Network Attached Storage), and SAN (Storage Area Network) relate to storage. RAM is memory, not storage."
            },
            {
              type: "fill-blank",
              prompt: "The ____ is the firmware interface that replaced the older BIOS standard.",
              accepted: ["UEFI"],
              hint: "Newer systems use this instead of BIOS",
              explanation: "UEFI (Unified Extensible Firmware Interface) is the modern replacement for BIOS with more features and capabilities."
            }
          ]
        },
        {
          id: "u1-l5",
          title: "Objective 1 Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "How many megabytes are in 1 gigabyte?",
              options: ["100 MB", "500 MB", "1,024 MB", "10,000 MB"],
              correctIndex: 2
            },
            {
              type: "match-pairs",
              instruction: "Match acronyms to their meanings",
              pairs: [
                { left: "GPU", right: "Graphics Processing Unit" },
                { left: "PSU", right: "Power Supply Unit" },
                { left: "HDMI", right: "High-Definition Multimedia Interface" }
              ]
            },
            {
              type: "type-answer",
              question: "Name one type of input device.",
              accepted: ["keyboard", "mouse", "microphone", "scanner", "trackpad", "joystick"],
              hint: "Something that sends data TO the computer",
              explanation: "Keyboards, mice, microphones, and scanners are all input devices."
            },
            {
              type: "true-false",
              statement: "USB-C is a universal connector standard supported by most modern devices.",
              correct: true,
              explanation: "USB-C is now the standard universal connector across phones, laptops, tablets, and other devices."
            }
          ]
        }
      ]
    },

    {
      id: "Objective 2",
      title: "Computing Fundamentals & Troubleshooting",
      description: "Number systems, data types, I/O processes, and CompTIA troubleshooting methodology",
      accent: "orange",
      lessons: [
        {
          id: "u2-l1",
          title: "Notational Systems",
          icon: "🔢",
          exercises: [
            {
              type: "multiple-choice",
              question: "How many digits are used in the binary number system?",
              options: ["10", "8", "2", "16"],
              correctIndex: 2,
              explanation: "Binary uses only two digits: 0 and 1. Each digit is called a 'bit'."
            },
            {
              type: "match-pairs",
              instruction: "Match each number system to its base",
              pairs: [
                { left: "Binary", right: "Base 2" },
                { left: "Decimal", right: "Base 10" },
                { left: "Hexadecimal", right: "Base 16" },
                { left: "Octal", right: "Base 8" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is the decimal equivalent of the binary number 1010?",
              options: ["8", "10", "12", "14"],
              correctIndex: 1,
              explanation: "1010 in binary = (1×8) + (0×4) + (1×2) + (0×1) = 8 + 2 = 10 in decimal."
            },
            {
              type: "fill-blank",
              prompt: "Hexadecimal uses digits 0-9 and letters A-F, where F represents the decimal number ____.",
              accepted: ["15"],
              hint: "It's the last letter in hex",
              explanation: "In hexadecimal, A=10, B=11, C=12, D=13, E=14, and F=15."
            },
            {
              type: "true-false",
              statement: "The hexadecimal number FF equals 255 in decimal.",
              correct: true,
              explanation: "FF in hex = (15×16) + 15 = 240 + 15 = 255 in decimal."
            }
          ]
        },
        {
          id: "u2-l2",
          title: "Data Types & Memory",
          icon: "📊",
          exercises: [
            {
              type: "multiple-choice",
              question: "What data type stores text characters?",
              options: ["Integer", "String", "Boolean", "Float"],
              correctIndex: 1,
              explanation: "String data type stores sequences of characters and text."
            },
            {
              type: "match-pairs",
              instruction: "Match each data type to its description",
              pairs: [
                { left: "Char", right: "Single character (letter, number, or symbol)" },
                { left: "String", right: "Multiple characters (text)" },
                { left: "Integer", right: "Whole numbers without decimals" },
                { left: "Float", right: "Decimal numbers with fractional parts" },
                { left: "Boolean", right: "True or False value" }
              ]
            },
            {
              type: "multi-select",
              question: "Which of these are valid examples of their stated data types?",
              options: ["'42' as a String", "3.14 as a Float", "True as a Boolean", "12.5 as an Integer"],
              correctIndices: [0, 1, 2],
              explanation: "'42' (in quotes) is a string, 3.14 is a float, and True is a boolean. 12.5 cannot be an integer because it has decimals."
            },
            {
              type: "true-false",
              statement: "A char data type can store multiple characters.",
              correct: false,
              explanation: "Char stores a single character; use String for multiple characters."
            },
            {
              type: "type-answer",
              question: "Name the data type that stores decimal numbers like 3.14159.",
              accepted: ["float", "double", "decimal"],
              hint: "It's commonly used for prices or measurements",
              explanation: "Float (floating-point) stores decimal numbers. Double is a similar type with higher precision."
            }
          ]
        },
        {
          id: "u2-l3",
          title: "Input, Processing, Output & Storage",
          icon: "⚙️",
          exercises: [
            {
              type: "multiple-choice",
              question: "Which term describes data being read by a computer?",
              options: ["Processing", "Input", "Output", "Storage"],
              correctIndex: 1,
              explanation: "Input is any data or commands sent TO the computer."
            },
            {
              type: "match-pairs",
              instruction: "Match each stage to an example",
              pairs: [
                { left: "Input", right: "Typing on a keyboard" },
                { left: "Processing", right: "CPU executing calculations" },
                { left: "Output", right: "Displaying results on a monitor" },
                { left: "Storage", right: "Saving a file to disk" }
              ]
            },
            {
              type: "multi-select",
              question: "Which are examples of output devices?",
              options: ["Speaker", "Printer", "Monitor", "Keyboard", "Headphones"],
              correctIndices: [0, 1, 2, 4],
              explanation: "Speakers, printers, monitors, and headphones all send data FROM the computer to the user. Keyboard is input."
            },
            {
              type: "true-false",
              statement: "Storage is temporary and data is lost when the computer is powered off.",
              correct: false,
              explanation: "Storage (like hard drives) is permanent; data persists when powered off. RAM is temporary."
            },
            {
              type: "fill-blank",
              prompt: "The ____ takes input data and performs operations on it.",
              accepted: ["cpu", "processor", "central processing unit"],
              hint: "The brain of the computer",
              explanation: "The CPU (Central Processing Unit) is responsible for processing all input data and executing instructions."
            }
          ]
        },
        {
          id: "u2-l4",
          title: "CompTIA Troubleshooting Methodology",
          icon: "🔧",
          exercises: [
            {
              type: "order-items",
              question: "Put the CompTIA troubleshooting steps in the correct order",
              items: ["Identify the problem", "Establish a theory of probable cause", "Test the theory to determine the cause", "Establish a plan of action and implement a solution", "Verify full system functionality", "Document the findings and lesson learned"],
              correctOrder: [0, 1, 2, 3, 4, 5],
              explanation: "The CompTIA troubleshooting methodology follows this systematic six-step approach."
            },
            {
              type: "multiple-choice",
              question: "According to CompTIA, what is the SECOND step in troubleshooting?",
              options: ["Test the theory", "Establish a theory of probable cause", "Identify the problem", "Implement a solution"],
              correctIndex: 1,
              explanation: "After identifying the problem, you establish a theory of the probable cause by asking questions and researching."
            },
            {
              type: "true-false",
              statement: "Documentation should only be done if you fail to solve the problem.",
              correct: false,
              explanation: "Documentation is always important - the final step involves documenting findings and lessons learned for all cases."
            },
            {
              type: "match-pairs",
              instruction: "Match each troubleshooting step to its activity",
              pairs: [
                { left: "Step 1: Identify", right: "Question the user and review system logs" },
                { left: "Step 2: Theory", right: "Determine what might be causing the issue" },
                { left: "Step 3: Test", right: "Verify your theory by testing" },
                { left: "Step 4: Implement", right: "Execute your solution plan" },
                { left: "Step 5: Verify", right: "Confirm the system works correctly" },
                { left: "Step 6: Document", right: "Record what was done and what was learned" }
              ]
            },
            {
              type: "multiple-choice",
              question: "If testing your theory shows it's incorrect, what should you do according to CompTIA methodology?",
              options: ["Give up and escalate immediately", "Try a random different solution", "Re-establish a new theory and test again", "Call the vendor for support"],
              correctIndex: 2,
              explanation: "If your theory is wrong, loop back to Step 2 and establish a new theory based on what you learned from testing."
            }
          ]
        },
        {
          id: "u2-l5",
          title: "Objective 2 Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "What is 1111 in binary equal to in decimal?",
              options: ["15", "12", "8", "11"],
              correctIndex: 0
            },
            {
              type: "type-answer",
              question: "What data type stores True or False values?",
              accepted: ["boolean"],
              hint: "Used for logic gates",
              explanation: "Boolean is a data type that stores only two values: True or False."
            },
            {
              type: "match-pairs",
              instruction: "Match IPOS stages to examples",
              pairs: [
                { left: "Input", right: "Mouse click" },
                { left: "Processing", right: "CPU calculation" },
                { left: "Output", right: "Screen display" }
              ]
            },
            {
              type: "order-items",
              question: "Arrange the CompTIA troubleshooting steps correctly",
              items: ["Verify functionality", "Establish theory", "Identify problem", "Test theory"],
              correctOrder: [2, 1, 3, 0],
              explanation: "The correct order starts with identifying, then establishing and testing theories, and finally verifying."
            }
          ]
        }
      ]
    },

    {
      id: "Objective 3",
      title: "Basic IT Security",
      description: "Security fundamentals, authentication, threats, and best practices",
      accent: "green",
      lessons: [
        {
          id: "u3-l1",
          title: "CIA Triad & Core Concepts",
          icon: "🔒",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each CIA triad component to its definition",
              pairs: [
                { left: "Confidentiality", right: "Ensuring data is only accessed by authorized users" },
                { left: "Integrity", right: "Ensuring data is accurate and hasn't been altered" },
                { left: "Availability", right: "Ensuring authorized users can access resources when needed" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Which CIA triad principle is violated if a hacker modifies financial records?",
              options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
              correctIndex: 1,
              explanation: "Integrity ensures data accuracy and hasn't been altered. Modified data violates integrity."
            },
            {
              type: "multi-select",
              question: "Which scenarios demonstrate a violation of the CIA triad?",
              options: ["A user cannot access their files due to a server outage", "A hacker reads confidential emails", "A malicious program changes system files", "A system requires a password to login"],
              correctIndices: [0, 1, 2],
              explanation: "Outage violates Availability; reading emails violates Confidentiality; changing files violates Integrity. Password requirement is security practice, not a violation."
            },
            {
              type: "true-false",
              statement: "Availability is about ensuring data remains confidential.",
              correct: false,
              explanation: "Availability ensures authorized access when needed. Confidentiality ensures only authorized users access data."
            }
          ]
        },
        {
          id: "u3-l2",
          title: "Authentication, Authorization & Accounting",
          icon: "👤",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each AAA principle to its definition",
              pairs: [
                { left: "Authentication", right: "Verifying that you are who you claim to be" },
                { left: "Authorization", right: "Determining what resources you are allowed to access" },
                { left: "Accounting", right: "Logging and tracking user activities for auditing" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Which AAA process occurs when a system verifies your password?",
              options: ["Authorization", "Authentication", "Accounting", "Encryption"],
              correctIndex: 1,
              explanation: "Authentication is the process of verifying your identity through credentials like passwords."
            },
            {
              type: "multiple-choice",
              question: "After a user logs in and is authenticated, what process determines which files they can access?",
              options: ["Accounting", "Authentication", "Authorization", "Encryption"],
              correctIndex: 2,
              explanation: "Authorization determines what resources an authenticated user is allowed to access."
            },
            {
              type: "true-false",
              statement: "Multi-factor authentication (MFA) requires something you know AND something you have.",
              correct: true,
              explanation: "MFA combines multiple authentication factors: something you know (password), something you have (phone), something you are (fingerprint)."
            },
            {
              type: "type-answer",
              question: "Name one example of a multi-factor authentication method.",
              accepted: ["password and phone", "fingerprint and password", "security key", "one-time password", "otp"],
              hint: "Something with two different factors",
              explanation: "MFA examples include password + PIN, password + phone verification, fingerprint + password, security keys, etc."
            }
          ]
        },
        {
          id: "u3-l3",
          title: "Social Engineering & Phishing",
          icon: "🎣",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is social engineering?",
              options: ["A computer virus", "Manipulating people to divulge confidential information", "A type of antivirus software", "A network protocol"],
              correctIndex: 1,
              explanation: "Social engineering uses psychological manipulation to trick people into revealing sensitive information."
            },
            {
              type: "match-pairs",
              instruction: "Match social engineering tactics to examples",
              pairs: [
                { left: "Phishing", right: "Fraudulent emails pretending to be legitimate companies" },
                { left: "Pretexting", right: "Creating a false scenario to build trust and extract information" },
                { left: "Baiting", right: "Offering something enticing (infected USB) to lure victims" },
                { left: "Tailgating", right: "Following an authorized person through a secured door" }
              ]
            },
            {
              type: "multi-select",
              question: "Which are indicators of a phishing email?",
              options: ["Urgent language requesting immediate action", "Sender asking you to verify passwords or financial info", "Suspicious links or attachments", "Poor spelling and grammar", "Your bank's official logo"],
              correctIndices: [0, 1, 2, 3],
              explanation: "Red flags include urgency, requests for sensitive info, suspicious links/attachments, and poor spelling. Official logos can be forged."
            },
            {
              type: "true-false",
              statement: "A legitimate company will never ask you to verify your password via email.",
              correct: true,
              explanation: "Companies never request passwords via email. This is a common phishing tactic."
            },
            {
              type: "fill-blank",
              prompt: "The practice of an attacker following someone through a secured door without using credentials is called ____.",
              accepted: ["tailgating", "piggybacking"],
              hint: "It's like riding someone's coattails through a door",
              explanation: "Tailgating is a physical security threat where unauthorized people gain access by following authorized users."
            }
          ]
        },
        {
          id: "u3-l4",
          title: "Malware, Antivirus & Firewalls",
          icon: "🛡️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each malware type to its description",
              pairs: [
                { left: "Virus", right: "Malicious code that replicates by attaching to files" },
                { left: "Worm", right: "Malicious program that spreads independently through networks" },
                { left: "Trojan", right: "Malware disguised as legitimate software" },
                { left: "Ransomware", right: "Malware that encrypts files and demands payment for decryption" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is the primary function of antivirus software?",
              options: ["Increase internet speed", "Detect and remove malicious software", "Replace the operating system", "Improve graphics performance"],
              correctIndex: 1,
              explanation: "Antivirus software scans for and removes viruses, malware, and other threats."
            },
            {
              type: "true-false",
              statement: "A firewall only allows outgoing connections and blocks all incoming connections.",
              correct: false,
              explanation: "Firewalls can be configured to allow specific incoming connections while blocking others based on rules."
            },
            {
              type: "multi-select",
              question: "What are functions of a firewall?",
              options: ["Monitor network traffic", "Block unauthorized access attempts", "Encrypt data", "Detect malware", "Control what traffic enters and leaves a network"],
              correctIndices: [0, 1, 4],
              explanation: "Firewalls monitor and control network traffic. Encryption and malware detection are different security functions."
            },
            {
              type: "type-answer",
              question: "What type of malware pretends to be legitimate software?",
              accepted: ["trojan", "trojan horse"],
              hint: "Named after a Greek story",
              explanation: "A Trojan horse is malware that disguises itself as legitimate software to trick users into installing it."
            }
          ]
        },
        {
          id: "u3-l5",
          title: "Password Security & Physical Security",
          icon: "🔐",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is the MOST important characteristic of a secure password?",
              options: ["It's easy to remember", "It's long and contains a mix of character types", "It contains your name", "It's the same for all accounts"],
              correctIndex: 1,
              explanation: "Strong passwords are long (8+ characters) and include uppercase, lowercase, numbers, and symbols."
            },
            {
              type: "multi-select",
              question: "Which are best practices for password security?",
              options: ["Use the same password for multiple accounts", "Change passwords regularly", "Never share your password with anyone", "Use passphrases with special characters", "Write passwords on sticky notes"],
              correctIndices: [1, 2, 3],
              explanation: "Reusing passwords and writing them down are security risks. Best practices include unique strong passwords, regular changes, and never sharing."
            },
            {
              type: "match-pairs",
              instruction: "Match physical security measures to their purposes",
              pairs: [
                { left: "Badge readers", right: "Control access to secure areas" },
                { left: "Surveillance cameras", right: "Monitor and record activity in facilities" },
                { left: "Mantraps", right: "Prevent tailgating by using restricted-access double doors" },
                { left: "Security guards", right: "Monitor entry/exit and verify credentials" }
              ]
            },
            {
              type: "true-false",
              statement: "Biometric security (fingerprints, facial recognition) cannot be lost or forgotten.",
              correct: true,
              explanation: "Biometrics are always with you and cannot be forgotten or stolen like passwords."
            },
            {
              type: "fill-blank",
              prompt: "A password that combines multiple unrelated words is called a ____.",
              accepted: ["passphrase"],
              hint: "Like 'correct horse battery staple'",
              explanation: "Passphrases are easier to remember than random strings while still providing good security."
            }
          ]
        },
        {
          id: "u3-l6",
          title: "Objective 3 Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match CIA triad terms to scenarios",
              pairs: [
                { left: "Confidentiality", right: "Hacker cannot read encrypted emails" },
                { left: "Integrity", right: "Files haven't been altered or corrupted" },
                { left: "Availability", right: "Website is running and users can access it" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Which AAA component verifies that you are who you claim to be?",
              options: ["Accounting", "Authorization", "Authentication", "Encryption"],
              correctIndex: 2
            },
            {
              type: "type-answer",
              question: "What technique involves manipulating people to reveal sensitive information?",
              accepted: ["social engineering"],
              hint: "Uses psychological manipulation",
              explanation: "Social engineering exploits human behavior to gain unauthorized access or information."
            },
            {
              type: "multi-select",
              question: "What makes a password secure?",
              options: ["Contains uppercase and lowercase letters", "Is longer than 8 characters", "Contains numbers and symbols", "Is your name or birthday", "Is unique for each account"],
              correctIndices: [0, 1, 2, 4],
              explanation: "Strong passwords use character variety, length, and uniqueness. Personal information (name, birthday) is weak."
            }
          ]
        }
      ]
    },

    {
      id: "Objective 4",
      title: "Software Development Concepts",
      description: "Programming fundamentals, languages, data structures, and logic",
      accent: "blue",
      lessons: [
        {
          id: "u4-l1",
          title: "Programming Languages & Paradigms",
          icon: "💻",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each programming language type to its example",
              pairs: [
                { left: "Interpreted/Scripting", right: "Python, JavaScript, Ruby" },
                { left: "Compiled", right: "C, C++, Java" },
                { left: "Query Language", right: "SQL" },
                { left: "Markup Language", right: "HTML, XML" },
                { left: "Assembly", right: "Low-level machine instructions" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Which type of programming language requires compilation before execution?",
              options: ["Interpreted", "Scripted", "Compiled", "Markup"],
              correctIndex: 2,
              explanation: "Compiled languages like C++ must be converted to machine code before running."
            },
            {
              type: "true-false",
              statement: "JavaScript is an example of an interpreted scripting language.",
              correct: true,
              explanation: "JavaScript is interpreted at runtime by web browsers, making it a scripting language."
            },
            {
              type: "multiple-choice",
              question: "What is the primary purpose of SQL?",
              options: ["Creating web pages", "Querying and managing databases", "Building mobile apps", "System administration"],
              correctIndex: 1,
              explanation: "SQL (Structured Query Language) is used to query, insert, update, and manage data in databases."
            },
            {
              type: "type-answer",
              question: "Name one example of a compiled programming language.",
              accepted: ["C", "C++", "Java", "Go", "Rust"],
              hint: "It must be compiled to machine code",
              explanation: "Compiled languages include C, C++, Java, Go, and Rust."
            }
          ]
        },
        {
          id: "u4-l2",
          title: "Variables, Constants & Data Structures",
          icon: "📦",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is a variable in programming?",
              options: ["A fixed value that never changes", "A named container that holds data values", "A function that repeats code", "A type of error message"],
              correctIndex: 1,
              explanation: "A variable is a named container used to store data that can change during program execution."
            },
            {
              type: "match-pairs",
              instruction: "Match each programming concept to its description",
              pairs: [
                { left: "Variable", right: "Named container with a value that can change" },
                { left: "Constant", right: "Named value that cannot be changed after assignment" },
                { left: "Array", right: "Ordered collection of elements accessed by index" },
                { left: "Object", right: "Collection of properties and methods" }
              ]
            },
            {
              type: "multiple-choice",
              question: "In programming, how do you access the first element of an array?",
              options: ["Index 1", "Index 0", "Using the .first() method", "Using the .head() method"],
              correctIndex: 1,
              explanation: "Most programming languages use zero-based indexing, so the first element is at index 0."
            },
            {
              type: "true-false",
              statement: "A constant's value can be changed after it is first assigned.",
              correct: false,
              explanation: "Constants are immutable; their value cannot change once assigned. That's what makes them different from variables."
            },
            {
              type: "fill-blank",
              prompt: "An ____ is a data structure that combines properties (data) with methods (functions).",
              accepted: ["object"],
              hint: "Object-oriented programming uses these",
              explanation: "Objects bundle data and behavior together, forming the foundation of object-oriented programming."
            }
          ]
        },
        {
          id: "u4-l3",
          title: "Functions, Methods & Scope",
          icon: "🔧",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is the primary purpose of a function in programming?",
              options: ["To store permanent data", "To create variables", "To reuse code and perform specific tasks", "To create loops"],
              correctIndex: 2,
              explanation: "Functions encapsulate reusable code blocks that perform specific tasks."
            },
            {
              type: "match-pairs",
              instruction: "Match each programming concept to its role",
              pairs: [
                { left: "Function", right: "Reusable block of code that performs a specific task" },
                { left: "Method", right: "A function that belongs to an object" },
                { left: "Parameter", right: "Input value passed to a function" },
                { left: "Return value", right: "Output that a function sends back to the caller" }
              ]
            },
            {
              type: "true-false",
              statement: "A function can return multiple values at once.",
              correct: true,
              explanation: "Many languages allow functions to return multiple values, often using arrays or objects."
            },
            {
              type: "multiple-choice",
              question: "What is variable scope in programming?",
              options: ["The range of values a variable can hold", "Where a variable can be accessed within a program", "How long a variable exists in memory", "The data type of a variable"],
              correctIndex: 1,
              explanation: "Scope defines the region of code where a variable is accessible and usable."
            },
            {
              type: "fill-blank",
              prompt: "When a function is part of an object, it is called a ____.",
              accepted: ["method"],
              hint: "Think object-oriented programming",
              explanation: "A method is a function defined within or associated with an object or class."
            }
          ]
        },
        {
          id: "u4-l4",
          title: "Logic, Control Flow & Pseudocode",
          icon: "🔀",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is pseudocode?",
              options: ["A programming language used to run code", "High-level text description of an algorithm before coding", "A type of error in code", "A debugging tool"],
              correctIndex: 1,
              explanation: "Pseudocode is informal, human-readable text used to plan logic before writing actual code."
            },
            {
              type: "match-pairs",
              instruction: "Match each control structure to its purpose",
              pairs: [
                { left: "If/Else", right: "Execute different code based on a condition" },
                { left: "For Loop", right: "Repeat code a set number of times" },
                { left: "While Loop", right: "Repeat code while a condition is true" },
                { left: "Switch", right: "Execute different code based on different cases" }
              ]
            },
            {
              type: "true-false",
              statement: "A flowchart uses shapes and arrows to visually represent program logic and flow.",
              correct: true,
              explanation: "Flowcharts are visual diagrams that show how a program processes information and makes decisions."
            },
            {
              type: "multi-select",
              question: "Which are common programming decision structures?",
              options: ["If statement", "Switch statement", "For loop", "While loop", "Array"],
              correctIndices: [0, 1],
              explanation: "If and Switch statements are decision structures. For and While are loops. Array is a data structure."
            },
            {
              type: "fill-blank",
              prompt: "A ____ is a visual diagram using shapes and arrows to show the flow of a program.",
              accepted: ["flowchart"],
              hint: "Shows decision points with diamonds",
              explanation: "Flowcharts use standard symbols to represent different types of program operations and decisions."
            }
          ]
        },
        {
          id: "u4-l5",
          title: "Objective 4 Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "Which programming language type requires compilation?",
              options: ["Scripting", "Markup", "Compiled", "Query"],
              correctIndex: 2
            },
            {
              type: "type-answer",
              question: "What do we call a reusable block of code that performs a specific task?",
              accepted: ["function"],
              hint: "Used throughout programs",
              explanation: "A function is a reusable block of code designed to perform a specific task."
            },
            {
              type: "match-pairs",
              instruction: "Match data structures to their descriptions",
              pairs: [
                { left: "Array", right: "Ordered collection with numeric indices" },
                { left: "Object", right: "Collection of properties and methods" }
              ]
            },
            {
              type: "true-false",
              statement: "In most programming languages, the first element of an array is at index 1.",
              correct: false,
              explanation: "Most languages use zero-based indexing, so the first element is at index 0."
            }
          ]
        }
      ]
    },

    {
      id: "Objective 5",
      title: "Data and Database Fundamentals",
      description: "Data concepts, database structures, and backup/recovery strategies",
      accent: "orange",
      lessons: [
        {
          id: "u5-l1",
          title: "Data as an Asset",
          icon: "💎",
          exercises: [
            {
              type: "multiple-choice",
              question: "Why is data considered a valuable asset to organizations?",
              options: ["It's easy to store", "It enables data-driven decisions and provides competitive advantage", "It takes up hard drive space", "It requires no maintenance"],
              correctIndex: 1,
              explanation: "Data drives decision-making, business intelligence, and competitive advantage."
            },
            {
              type: "match-pairs",
              instruction: "Match each data concept to its meaning",
              pairs: [
                { left: "Data Analytics", right: "Examining data to find insights and patterns" },
                { left: "Big Data", right: "Very large datasets that require special processing" },
                { left: "Data Monetization", right: "Generating revenue by selling or using data insights" },
                { left: "Data-Driven Decisions", right: "Making choices based on data analysis rather than intuition" }
              ]
            },
            {
              type: "true-false",
              statement: "GDPR is a regulation that protects personal data privacy in the European Union.",
              correct: true,
              explanation: "The General Data Protection Regulation (GDPR) gives individuals rights over their personal data."
            },
            {
              type: "multi-select",
              question: "Which of these are examples of Personally Identifiable Information (PII)?",
              options: ["Social Security Number", "Email address", "Phone number", "Favorite color", "Home address"],
              correctIndices: [0, 1, 2, 4],
              explanation: "PII is information that can identify individuals: SSN, email, phone, address. Favorite color is not PII."
            },
            {
              type: "type-answer",
              question: "What regulation protects personal data privacy in the European Union?",
              accepted: ["GDPR", "General Data Protection Regulation"],
              hint: "It's a European privacy law acronym",
              explanation: "GDPR (General Data Protection Regulation) sets strict rules for handling personal data."
            }
          ]
        },
        {
          id: "u5-l2",
          title: "Database Concepts",
          icon: "🗄️",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is the main advantage of a database over a flat file?",
              options: ["Databases are smaller", "Databases allow complex queries and relationships between data", "Databases are easier to create", "Databases don't require storage"],
              correctIndex: 1,
              explanation: "Databases enable querying, indexing, and relationships; flat files are just stored text."
            },
            {
              type: "match-pairs",
              instruction: "Match each database operation to its purpose",
              pairs: [
                { left: "Create", right: "Add new data to the database" },
                { left: "Query", right: "Retrieve specific data based on criteria" },
                { left: "Report", right: "Generate summaries and analyses of data" },
                { left: "Persist", right: "Ensure data is stored permanently" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is a database record?",
              options: ["A single table", "A row of data containing related information", "A query result", "A backup copy"],
              correctIndex: 1,
              explanation: "A record is a row in a table containing one complete set of related data."
            },
            {
              type: "true-false",
              statement: "A flat file database can maintain complex relationships between data types.",
              correct: false,
              explanation: "Flat files store data in simple text format with limited relationship capabilities. Relational databases excel at maintaining complex relationships."
            },
            {
              type: "fill-blank",
              prompt: "A ____ is a single row of data in a database table containing related information.",
              accepted: ["record"],
              hint: "It's a horizontal row",
              explanation: "A database record contains all the data for one entity across multiple fields."
            }
          ]
        },
        {
          id: "u5-l3",
          title: "Database Structures & Schemas",
          icon: "🗂️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each database structure type to its characteristics",
              pairs: [
                { left: "Structured Data", right: "Organized in tables with defined columns (SQL databases)" },
                { left: "Semi-Structured Data", right: "Has some organization but flexible schema (JSON, XML)" },
                { left: "Unstructured Data", right: "No predefined format (images, videos, text documents)" },
                { left: "Relational", right: "Uses tables with relationships via keys" },
                { left: "Non-Relational", right: "Key-value stores, document databases (NoSQL)" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is a primary key in a relational database?",
              options: ["A backup key", "A unique identifier for each record", "The most important column", "A password for the database"],
              correctIndex: 1,
              explanation: "A primary key uniquely identifies each record in a table and prevents duplicates."
            },
            {
              type: "multiple-choice",
              question: "What is a foreign key used for?",
              options: ["Accessing a different database", "Linking records in one table to another table", "Securing the database", "Backing up data"],
              correctIndex: 1,
              explanation: "A foreign key creates relationships between tables by referencing another table's primary key."
            },
            {
              type: "true-false",
              statement: "NoSQL databases use tables and foreign keys like SQL databases.",
              correct: false,
              explanation: "NoSQL databases use flexible document structures (key-value, document stores) rather than rigid tables and relationships."
            },
            {
              type: "fill-blank",
              prompt: "The structure and organization of a database is defined by its ____.",
              accepted: ["schema"],
              hint: "It defines tables and columns",
              explanation: "A schema is the blueprint that defines the structure, tables, columns, and relationships in a database."
            }
          ]
        },
        {
          id: "u5-l4",
          title: "Backup, Recovery & Data Persistence",
          icon: "💾",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each backup type to its description",
              pairs: [
                { left: "Full Backup", right: "Complete copy of all data" },
                { left: "Incremental Backup", right: "Only new or changed data since last backup" },
                { left: "Differential Backup", right: "All changes since the last full backup" },
                { left: "System Backup", right: "Backup of entire operating system and settings" },
                { left: "File Backup", right: "Backup of specific files or folders" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Where should backup data be stored to ensure safety?",
              options: ["Only on the same computer", "In multiple locations (local and cloud)", "Only in the cloud", "Never backed up"],
              correctIndex: 1,
              explanation: "Best practice is to use the 3-2-1 rule: 3 copies, 2 media types, 1 offsite."
            },
            {
              type: "true-false",
              statement: "A backup is useless unless it can be restored successfully.",
              correct: true,
              explanation: "Regular restore testing ensures backups are viable and can recover data when needed."
            },
            {
              type: "multi-select",
              question: "Which are benefits of cloud storage for backups?",
              options: ["Automatic scalability", "Accessible from anywhere", "No disaster risk", "Lower hardware costs", "Data is always encrypted"],
              correctIndices: [0, 1, 3],
              explanation: "Cloud backups scale automatically, are accessible remotely, and reduce hardware needs. Cloud still has risks and encryption depends on implementation."
            },
            {
              type: "fill-blank",
              prompt: "Data ____ ensures that data remains available and safe even if hardware fails.",
              accepted: ["persistence"],
              hint: "The ability to keep data safe long-term",
              explanation: "Data persistence means data survives system failures and continues to be available after recovery."
            }
          ]
        },
        {
          id: "u5-l5",
          title: "Objective 5 Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "What is the main advantage of a database over a flat file?",
              options: ["Size", "Complex queries and relationships", "Speed only", "No advantages"],
              correctIndex: 1
            },
            {
              type: "type-answer",
              question: "What uniquely identifies each record in a database table?",
              accepted: ["primary key"],
              hint: "A unique identifier",
              explanation: "The primary key ensures each record is unique and identifiable."
            },
            {
              type: "match-pairs",
              instruction: "Match backup types to their scope",
              pairs: [
                { left: "Full Backup", right: "Complete copy of all data" },
                { left: "Incremental", right: "Only changes since last backup" }
              ]
            },
            {
              type: "true-false",
              statement: "PII protection is required by regulations like GDPR.",
              correct: true,
              explanation: "GDPR and other regulations strictly protect personally identifiable information."
            }
          ]
        }
      ]
    },

    {
      id: "Objective 6",
      title: "Comprehensive IT Security",
      description: "Advanced security, encryption, wireless security, and compliance",
      accent: "green",
      lessons: [
        {
          id: "u6-l1",
          title: "Security Fundamentals & Privacy",
          icon: "🔐",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each security concept to its definition",
              pairs: [
                { left: "CIA Triad", right: "Confidentiality, Integrity, and Availability" },
                { left: "Principle of Least Privilege", right: "Users get only minimum permissions needed" },
                { left: "Logging", right: "Recording user activities for audit trails" },
                { left: "Single Sign-On", right: "One login authenticates across multiple systems" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is the principle of least privilege?",
              options: ["Give all users admin access", "Grant users only minimum permissions needed for their role", "No one gets any permissions", "Everyone has equal access"],
              correctIndex: 1,
              explanation: "Least privilege limits damage if a user account is compromised."
            },
            {
              type: "true-false",
              statement: "SSO (Single Sign-On) means using the same password for all systems.",
              correct: false,
              explanation: "SSO uses one authentication to access multiple systems, but doesn't mean using the same password everywhere."
            },
            {
              type: "multi-select",
              question: "Which are examples of Personally Identifiable Information (PII)?",
              options: ["Social Security Number", "Date of birth", "Email address", "Job title", "Mother's maiden name"],
              correctIndices: [0, 1, 2, 4],
              explanation: "PII identifies individuals. Social Security numbers, DOB, emails, and mothers' maiden names are PII. Job title alone is not PII."
            },
            {
              type: "fill-blank",
              prompt: "Recording user activities in an audit log enables ____ and security monitoring.",
              accepted: ["logging", "accountability"],
              hint: "Keeps records of who did what",
              explanation: "Logging creates accountability and helps detect unauthorized activities."
            }
          ]
        },
        {
          id: "u6-l2",
          title: "Encryption & Data Protection",
          icon: "🔒",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match encryption concepts to their meanings",
              pairs: [
                { left: "Plaintext", right: "Unencrypted, readable data" },
                { left: "Ciphertext", right: "Encrypted, unreadable data" },
                { left: "Data at Rest", right: "Data stored on devices or servers" },
                { left: "Data in Transit", right: "Data moving over networks" },
                { left: "HTTPS", right: "Secure encrypted web protocol" },
                { left: "VPN", right: "Virtual Private Network for encrypted connections" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why is encrypting data in transit important?",
              options: ["To make downloads slower", "To prevent interception and eavesdropping on networks", "To use less disk space", "It's not important"],
              correctIndex: 1,
              explanation: "Encryption protects data as it travels over networks where it could be intercepted."
            },
            {
              type: "true-false",
              statement: "HTTPS encrypts data between your browser and a website.",
              correct: true,
              explanation: "HTTPS uses SSL/TLS encryption to secure connections between clients and web servers."
            },
            {
              type: "multiple-choice",
              question: "What does a VPN (Virtual Private Network) do?",
              options: ["Speeds up internet", "Creates an encrypted tunnel for secure remote connections", "Blocks all ads", "Stores your data"],
              correctIndex: 1,
              explanation: "VPNs encrypt all traffic to create secure connections, especially important for remote work and public WiFi."
            },
            {
              type: "fill-blank",
              prompt: "______ protection involves securing data both when it's stored and when it travels over networks.",
              accepted: ["encryption", "data"],
              hint: "Both at rest and in transit",
              explanation: "Comprehensive encryption protects data in all states: stored, transmitted, and in use."
            }
          ]
        },
        {
          id: "u6-l3",
          title: "Device Security & Patching",
          icon: "🛡️",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match security measures to their purposes",
              pairs: [
                { left: "Patching", right: "Applying updates to fix security vulnerabilities" },
                { left: "Antivirus", right: "Detect and remove malicious software" },
                { left: "Firewall", right: "Monitor and control network traffic" },
                { left: "License Verification", right: "Ensure software is legally authorized" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why is software patching critical for security?",
              options: ["To add new features", "To fix security vulnerabilities before they're exploited", "To increase performance", "It's optional"],
              correctIndex: 1,
              explanation: "Patches close security holes that attackers could exploit to compromise systems."
            },
            {
              type: "true-false",
              statement: "It's safe to download software from untrusted sources as long as you run antivirus.",
              correct: false,
              explanation: "Always download from official sources. Malware can evade antivirus, so prevention is better than cure."
            },
            {
              type: "multi-select",
              question: "Which are safe software sourcing practices?",
              options: ["Download from official vendor websites", "Use app stores from trusted platforms", "Download from random file-sharing sites", "Verify digital signatures and checksums", "Use only pirated or cracked software"],
              correctIndices: [0, 1, 3],
              explanation: "Official sources and app stores are safe. Verify authenticity. Avoid pirated software and untrusted sites."
            },
            {
              type: "fill-blank",
              prompt: "Regularly installing security ____ closes vulnerabilities before attackers exploit them.",
              accepted: ["patches", "updates"],
              hint: "Software fixes and updates",
              explanation: "Security patches are critical updates that fix discovered vulnerabilities."
            }
          ]
        },
        {
          id: "u6-l4",
          title: "Wireless Network Security",
          icon: "📡",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match WiFi security standards to their level of protection",
              pairs: [
                { left: "WEP", right: "Very weak (outdated, avoid)" },
                { left: "WPA", right: "Better, but WPA2/WPA3 are preferred" },
                { left: "WPA2", right: "Strong, widely used standard" },
                { left: "WPA3", right: "Latest, most secure WiFi standard" }
              ]
            },
            {
              type: "multiple-choice",
              question: "Why should you change the default password on your WiFi router?",
              options: ["To make it faster", "To prevent unauthorized access and attacks", "It's not necessary", "To increase signal strength"],
              correctIndex: 1,
              explanation: "Default passwords are publicly known; changing them is crucial for router security."
            },
            {
              type: "true-false",
              statement: "Hiding your WiFi SSID (network name) provides security through obscurity.",
              correct: true,
              explanation: "While not encryption, hiding SSID adds a basic layer of obscurity, though it's not a complete security measure."
            },
            {
              type: "multi-select",
              question: "Which are WiFi security best practices?",
              options: ["Use WPA2 or WPA3 encryption", "Change default administrator password", "Disable WPS (WiFi Protected Setup)", "Use the default SSID name", "Broadcast SSID for convenience"],
              correctIndices: [0, 1, 2],
              explanation: "Use strong encryption, change defaults, and disable vulnerable features. Broadcasting SSID is less secure."
            },
            {
              type: "fill-blank",
              prompt: "The ____ is your WiFi network name and can be hidden for additional obscurity.",
              accepted: ["SSID"],
              hint: "The network name you see when connecting",
              explanation: "SSID (Service Set Identifier) is the broadcast name of your wireless network."
            }
          ]
        },
        {
          id: "u6-l5",
          title: "Safe Browsing & Certificates",
          icon: "🌐",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match certificate concepts to their meanings",
              pairs: [
                { left: "SSL/TLS Certificate", right: "Encrypts connections and verifies website identity" },
                { left: "Expired Certificate", right: "No longer valid; indicates potential security risk" },
                { left: "Self-Signed Certificate", right: "Certificate not verified by trusted authority" },
                { left: "Certificate Authority", right: "Trusted organization that issues digital certificates" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What does a lock icon in your browser URL bar indicate?",
              options: ["Slow connection", "Secure HTTPS connection with valid certificate", "Website is popular", "Data is backed up"],
              correctIndex: 1,
              explanation: "A lock icon shows the connection is encrypted and the certificate is valid."
            },
            {
              type: "true-false",
              statement: "You should trust a website with an expired SSL certificate.",
              correct: false,
              explanation: "Expired certificates indicate the site may be compromised or neglected. Avoid entering sensitive data."
            },
            {
              type: "multi-select",
              question: "Which are safe browsing practices?",
              options: ["Look for HTTPS and lock icon", "Verify URLs before clicking links", "Avoid public WiFi for sensitive transactions", "Click on all email links to verify", "Keep browser updated"],
              correctIndices: [0, 1, 2, 4],
              explanation: "Check for HTTPS, verify URLs, use secure networks, and update browser. Don't click suspicious links."
            },
            {
              type: "fill-blank",
              prompt: "A ____ certificate verifies a website's identity and enables encryption.",
              accepted: ["SSL", "TLS", "SSL/TLS"],
              hint: "Shows encrypted connection in browser",
              explanation: "SSL (Secure Sockets Layer) or TLS (Transport Layer Security) certificates enable encrypted HTTPS connections."
            }
          ]
        },
        {
          id: "u6-l6",
          title: "Objective 6 Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match security concepts to definitions",
              pairs: [
                { left: "Least Privilege", right: "Minimum permissions needed for a role" },
                { left: "Logging", right: "Recording user activities for audits" },
                { left: "Encryption", right: "Converting data to unreadable form" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What does HTTPS encrypt?",
              options: ["Only passwords", "Data between browser and website", "All internet traffic", "Email only"],
              correctIndex: 1
            },
            {
              type: "type-answer",
              question: "What is the most secure WiFi security standard?",
              accepted: ["WPA3"],
              hint: "It's the latest standard",
              explanation: "WPA3 is the newest and most secure WiFi security standard."
            },
            {
              type: "multi-select",
              question: "What indicates a secure website connection?",
              options: ["Lock icon in URL bar", "HTTPS in address", "Green color in browser", "High speed connection"],
              correctIndices: [0, 1, 2],
              explanation: "Lock icon, HTTPS protocol, and green coloring all indicate a secure connection with valid certificate."
            }
          ]
        }
      ]
    }
  ]
};
*/

/* If you're building something other than a language course, the same
   three exercise types work fine for any subject — just change the
   question text, options, and accepted answers. For example, a history
   course lesson might look like:

   {
     id: "h1-l1",
     title: "The French Revolution",
     icon: "📜",
     exercises: [
       {
         type: "multiple-choice",
         question: "In what year did the French Revolution begin?",
         options: ["1776", "1789", "1804", "1815"],
         correctIndex: 1
       }
     ]
   }
*/
