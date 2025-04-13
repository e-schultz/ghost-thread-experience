
import { LogEntry } from '../types';

export const logData: LogEntry[] = [
  {
    id: "01",
    title: "ghost-trace init",
    date: "April 1st - 2:00am",
    content: "April 1st - ghost-trace init\n- 2:00am - session closed, pizza.\non, trying a thought ->\npen x paper first, if I\nwant to digitally capture,\ncan AI read my scratch?",
    ocrConfidence: 93,
    imagePath: "/lovable-uploads/df7e1865-e5b0-4e10-a9dd-8d6658902843.jpeg",
  },
  {
    id: "02",
    title: "Continued thoughts",
    date: "April 1st - 2:15am",
    content: "that's pretty cool. thought\nmy writing would be too\nmessy, I guess time\nwill tell depending on\nhow creative I get w/\nmy format",
    ocrConfidence: 89,
    tasks: [
      { text: "late night eats", completed: false },
      { text: "keep writing", completed: true },
      { text: "tidy my space", completed: false }
    ],
    imagePath: "/lovable-uploads/a6fba7d0-5ced-4afe-aa32-705d2ca6610c.jpeg",
  },
  {
    id: "03",
    title: "Scrying init test",
    date: "April 1st - 2:30am",
    content: "ID | DESC.\n01 | Scrying init test\n\nID:01\nso the thought\nhere is I can\norganize my notes,\nfor reference by\nID -> curious to\nsee how FLOAT\nwill parse this",
    ocrConfidence: 95,
    imagePath: "/lovable-uploads/1cc13f6d-fdb6-4008-b2a7-bc2d169f70e4.jpeg",
  },
  {
    id: "04",
    title: "Test Results",
    date: "April 1st - 2:45am",
    content: "Test Results\nHow does FLOAT\nTrack [01]?",
    ocrConfidence: 97,
    imagePath: "/lovable-uploads/c992c2ee-36c1-41a6-8519-9add1d345f15.jpeg",
  },
  {
    id: "05",
    title: "Analog recursive thoughts",
    date: "April 1st - 3:00am",
    content: "ID:01 | part 4: how I work\nis kinda captive ergatin\n& resurface later,\nbut what happens if\nanalog?",
    ocrConfidence: 86,
    imagePath: "/lovable-uploads/50184a8f-1f98-4ad7-8da0-02d08a65210a.png",
  }
];
