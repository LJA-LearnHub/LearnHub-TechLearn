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
  courseTitle: "PathLearn",

  units: [
    {
      id: "Objective 1",
      title: "Objective 1, IT Concepts",
      description: "Learn your IT concepts",
      accent: "blue",
      lessons: [
        {
          id: "u1-l1",
          title: "Basic Terms",
          icon: "🖥️",
          exercises: [
            {
              type: "multiple-choice",
              question: "What does PC stand for?",
              options: ["Personal Computer", "People Computer", "Pro Computer", "Computer personal"],
              correctIndex: 0,
              explanation: "Personal Computer is commonly used to defince the term 'PC'"
            },
            {
              type: "type-answer",
              question: "What does GPU stand for?",
              accepted: ["graphic processing unit", "graphics processing unit"],
              hint: "It handles graphics",
              explanation: "The term 'GPU' stands for Graphics Processing Unit"
            },
            {
              type: "multiple-choice",
              question: "What is the purpose of the GPU?",
              options: ["To store system infomation", "To preform math problems", "To display graphics", "Provide network connections"],
              correctIndex: 2,
              explanation: "The primary prupose of the GPU is to display graphics"
            },
            {
              type: "match-pairs",
              instruction: "What doest each word stand for? Match the pairs",
              pairs: [
                { left: "CPU",      right: "Central Processing Unit" },
                { left: "RAM",    right: "Random Access Memory" },
                { left: "SSD",     right: "Solid State Drive" },
                { left: "PSU",  right: "Power Supply Unit" }
              ]
            },
            {
              type: "multiple-choice",
              question: "What is the purpose of the motherboard?",
              options: ["To store system infomation", "To act as the central backbone", "To display graphics", "To watch videos"],
              correctIndex: 1,
              explanation: "The primary prupose of the motherboard is to act as a backbone for other components"
            },
            {
              type: "type-answer",
              question: "What is an example of a internal storage device?",
              accepted: ["HDD", "hard drive", "Solid State Drive", "SSD", "M.2", "hard disk drive", "hard disc drive"],
              hint: "It's not RAM",
              explanation: ""
            }
          ]
        },
        {
          id: "u1-l2",
          title: "Introducing Yourself",
          icon: "🙋",
          exercises: [
            {
              type: "multiple-choice",
              question: "How do you say 'My name is...' in Spanish?",
              options: ["Me llamo...", "Tengo...", "Soy de...", "Vivo en..."],
              correctIndex: 0,
              explanation: "'Me llamo' literally translates to 'I call myself'."
            },
            {
              type: "type-answer",
              question: "Type the Spanish word for 'please'.",
              accepted: ["por favor"],
              hint: "Two words",
              explanation: "Por favor is used to make a polite request."
            }
          ]
        },
        {
          id: "u1-l3",
          title: "Matching Practice",
          icon: "🔗",
          exercises: [
            {
              type: "match-pairs",
              instruction: "Match each word to its translation",
              pairs: [
                { left: "Hello", right: "Hola" },
                { left: "Goodbye", right: "Adiós" },
                { left: "Please", right: "Por favor" },
                { left: "Thank you", right: "Gracias" }
              ]
            }
          ]
        },
        {
          id: "u1-l4",
          title: "Unit 1 Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "Which of these means 'thank you'?",
              options: ["Gracias", "Hola", "Adiós", "Sí"],
              correctIndex: 0
            },
            {
              type: "type-answer",
              question: "Type the word for 'hello' in Spanish.",
              accepted: ["hola"]
            },
            {
              type: "multiple-choice",
              question: "'Me llamo Ana' means...",
              options: ["I am from Ana", "My name is Ana", "I live in Ana", "I like Ana"],
              correctIndex: 1
            }
          ]
        }
      ]
    },

    {
      id: "unit-2",
      title: "Unit 2: Numbers & Basics",
      description: "Count, ask questions, and build simple sentences.",
      accent: "orange",
      lessons: [
        {
          id: "u2-l1",
          title: "Counting 1-5",
          icon: "🔢",
          exercises: [
            {
              type: "multiple-choice",
              question: "What is 'three' in Spanish?",
              options: ["Uno", "Dos", "Tres", "Cuatro"],
              correctIndex: 2
            },
            {
              type: "type-answer",
              question: "Type the Spanish word for 'five'.",
              accepted: ["cinco"],
              hint: "Starts with a C"
            }
          ]
        },
        {
          id: "u2-l2",
          title: "Asking Questions",
          icon: "❓",
          exercises: [
            {
              type: "multiple-choice",
              question: "'¿Cómo estás?' means...",
              options: ["Where are you?", "How are you?", "Who are you?", "What is that?"],
              correctIndex: 1
            },
            {
              type: "match-pairs",
              instruction: "Match each question word to its meaning",
              pairs: [
                { left: "¿Qué?", right: "What?" },
                { left: "¿Dónde?", right: "Where?" },
                { left: "¿Cuándo?", right: "When?" },
                { left: "¿Quién?", right: "Who?" }
              ]
            }
          ]
        },
        {
          id: "u2-l3",
          title: "Unit 2 Checkpoint",
          icon: "🏆",
          checkpoint: true,
          exercises: [
            {
              type: "multiple-choice",
              question: "What is 'one' in Spanish?",
              options: ["Uno", "Dos", "Tres", "Cinco"],
              correctIndex: 0
            },
            {
              type: "type-answer",
              question: "Type the Spanish word for 'how are you' (2 words).",
              accepted: ["como estas", "cómo estás"]
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
