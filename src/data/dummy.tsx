import React from "react";

import {
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";
import {
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
  BsClipboard2Pulse,
} from "react-icons/bs";
import {
  LuFolderArchive,
  LuFolderCheck,
  LuFolderClock,
  LuFolderX,
} from "react-icons/lu";

import { TiTick } from "react-icons/ti";
import avatar from "./avatar.jpg";
import avatar2 from "./avatar2.jpg";
import avatar3 from "./avatar3.png";
import avatar4 from "./avatar4.jpg";
import product1 from "./product1.jpg";
import product2 from "./product2.jpg";
import product3 from "./product3.jpg";
import product4 from "./product4.jpg";
import product5 from "./product5.jpg";
import product6 from "./product6.jpg";
import product7 from "./product7.jpg";

import { ContextMenuItem } from "@syncfusion/ej2-react-grids";
import { FaRegClipboard } from "react-icons/fa";
import { TbClipboardCheck } from "react-icons/tb";

export const gridOrderImage = (props: any) => (
  <div>
    <img className="rounded-xl h-20 md:ml-3" src="test.jpeg" alt="order-item" />
  </div>
);

export const gridOrderStatus = (props: any) => (
  <button
    type="button"
    style={{ background: props.StatusBg }}
    className="text-white py-1 px-2 capitalize rounded-2xl text-md"
  >
    {props.Status}
  </button>
);

export const kanbanGrid = [
  { headerText: "To Do", keyField: "Open", allowToggle: true },

  { headerText: "In Progress", keyField: "InProgress", allowToggle: true },

  {
    headerText: "Testing",
    keyField: "Testing",
    allowToggle: true,
    isExpanded: false,
  },

  { headerText: "Done", keyField: "Close", allowToggle: true },
];

export const EditorData = () => (
  <div>
    <h3>
      Try React React has been designed from the start for gradual adoption, and
      you can use as little or as much React as you need. Whether you want to
      get a taste of React, add some interactivity to a simple HTML page, or
      start a complex React-powered app, the links in this section will help you
      get started. Online Playgrounds If you’re interested in playing around
      with React, you can use an online code playground. Try a Hello World
      template on CodePen, CodeSandbox, or Stackblitz. If you prefer to use your
      own text editor, you can also download this HTML file, edit it, and open
      it from the local filesystem in your browser. It does a slow runtime code
      transformation, so we’d only recommend using this for simple demos. Add
      React to a Website You can add React to an HTML page in one minute. You
      can then either gradually expand its presence, or keep it contained to a
      few dynamic widgets. Create a New React App When starting a React project,
      a simple HTML page with script tags might still be the best option. It
      only takes a minute to set up! As your application grows, you might want
      to consider a more integrated setup. There are several JavaScript
      toolchains we recommend for larger applications. Each of them can work
      with little to no configuration and lets you take full advantage of the
      rich React ecosystem. Learn how. Learn React People come to React from
      different backgrounds and with different learning styles. Whether you
      prefer a more theoretical or a practical approach, we hope you’ll find
      this section helpful. If you prefer to learn by doing, start with our
      practical tutorial. If you prefer to learn concepts step by step, start
      with our guide to main concepts. Like any unfamiliar technology, React
      does have a learning curve. With practice and some patience, you will get
      the hang of it. First Examples The React homepage contains a few small
      React examples with a live editor. Even if you don’t know anything about
      React yet, try changing their code and see how it affects the result.
      React for Beginners If you feel that the React documentation goes at a
      faster pace than you’re comfortable with, check out this overview of React
      by Tania Rascia. It introduces the most important React concepts in a
      detailed, beginner-friendly way. Once you’re done, give the documentation
      another try! React for Designers If you’re coming from a design
      background, these resources are a great place to get started. JavaScript
      Resources The React documentation assumes some familiarity with
      programming in the JavaScript language. You don’t have to be an expert,
      but it’s harder to learn both React and JavaScript at the same time. We
      recommend going through this JavaScript overview to check your knowledge
      level. It will take you between 30 minutes and an hour but you will feel
      more confident learning React.
    </h3>
  </div>
);
export const customerGridImage = (props: any) => (
  <div className="image flex gap-4">
    <img
      className="rounded-full w-10 h-10"
      src={props.CustomerImage}
      alt="employee"
    />
    <div>
      <p>{props.CustomerName}</p>
      <p>{props.CustomerEmail}</p>
    </div>
  </div>
);

const customerGridStatus = (props: any) => (
  <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
    <p
      style={{ background: props.StatusBg }}
      className="rounded-full h-3 w-3"
    />
    <p>{props.Status}</p>
  </div>
);
export const areaPrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  majorGridLines: { width: 0 },
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  labelStyle: { color: "gray" },
};

export const areaPrimaryYAxis = {
  labelFormat: "{value}%",
  lineStyle: { width: 0 },
  maximum: 4,
  interval: 1,
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  labelStyle: { color: "gray" },
};
export const barPrimaryXAxis = {
  valueType: "Category",
  interval: 1,
  majorGridLines: { width: 0 },
};
export const barPrimaryYAxis = {
  majorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  lineStyle: { width: 0 },
  labelStyle: { color: "transparent" },
};

export const FinancialPrimaryXAxis = {
  valueType: "DateTime",
  minimum: new Date("2016, 12, 31"),
  maximum: new Date("2017, 9, 30"),
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 },
};

export const FinancialPrimaryYAxis = {
  title: "Price",
  minimum: 100,
  maximum: 180,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
};

export const LinePrimaryXAxis = {
  valueType: "DateTime",
  labelFormat: "y",
  intervalType: "Years",
  edgeLabelPlacement: "Shift",
  majorGridLines: { width: 0 },
  background: "white",
};

export const LinePrimaryYAxis = {
  labelFormat: "{value}%",
  rangePadding: "None",
  minimum: 0,
  maximum: 100,
  interval: 20,
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
};

export const cartData = [
  {
    image: product5,
    name: "butterscotch ice-cream",
    category: "Milk product",
    price: "$250",
  },
  {
    image: product6,
    name: "Supreme fresh tomato",
    category: "Vegetable Item",
    price: "$450",
  },
  {
    image: product7,
    name: "Red color candy",
    category: "Food Item",
    price: "$190",
  },
];

export const recentTransactions = [
  {
    icon: <LuFolderCheck />,
    amount: "0",
    title: "Dossiers Acceptés",
    desc: "",
    iconBg: "#E5FAFB",
    pcColor: "green-600",
  },
  {
    icon: <LuFolderX />,
    amount: "0",
    desc: "",
    title: "Dossiers refusés",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#396EA5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const ordersGrid = [
  {
    headerText: "Image",
    template: gridOrderImage,
    textAlign: "Center",
    width: "120",
  },
  {
    field: "OrderItems",
    headerText: "Nom Article",
    width: "150",
    editType: "dropdownedit",
    textAlign: "Center",
  },
  {
    field: "CustomerName",
    headerText: "Nom Auteur",
    width: "150",
    textAlign: "Center",
  },
  {
    field: "TotalAmount",
    headerText: "Catégories",
    format: "C2",
    textAlign: "Center",
    editType: "numericedit",
    width: "150",
  },
  {
    headerText: "Status",
    template: gridOrderStatus,
    field: "OrderItems",
    textAlign: "Center",
    width: "120",
  },
  {
    field: "OrderID",
    headerText: "ID",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "Location",
    headerText: "Notes",
    width: "150",
    textAlign: "Center",
  },
];
export const ordersData = [
  {
    ID: 1,
    CustomerName: "Admin test",
    TotalAmount: "Oncologie",
    OrderItems: "test blog",
    Location: "USA",
    Status: "Actif",
    StatusBg: "#396EA5",
  },
  {
    ID: 2,
    CustomerName: "Admin test",
    TotalAmount: "Oncologie",
    OrderItems: "test blog",
    Location: "USA",
    Status: "Actif",
    StatusBg: "#396EA5",
  },
  {
    ID: 3,
    CustomerName: "Admin test",
    TotalAmount: "Oncologie",
    OrderItems: "test blog",
    Location: "USA",
    Status: "Actif",
    StatusBg: "#396EA5",
  },
];

export const patientsData = [
  {
    CustomerID: 1001,
    CustomerName: "Nirav Joshi",
    CustomerEmail: "nirav@gmail.com",
    CustomerImage: avatar2,
    ProjectName: "Hosting Press HTML",
    Status: "Active",
    StatusBg: "#8BE78B",
    Weeks: "40",
    Budget: "$2.4k",
    Location: "India",
  },
  {
    CustomerID: 1002,

    CustomerName: "Sunil Joshi",
    CustomerEmail: "sunil@gmail.com",
    ProjectName: "Elite Admin",
    Status: "Active",
    CustomerImage: avatar3,

    StatusBg: "#8BE78B",
    Weeks: "11",
    Budget: "$3.9k",
    Location: "India",
  },
];

export const scheduleData = [
  {
    Id: 1,
    Subject: "Explosion of Betelgeuse Star",
    Location: "Space Center USA",
    StartTime: "2021-01-10T04:00:00.000Z",
    EndTime: "2021-01-10T05:30:00.000Z",
    CategoryColor: "#1aaa55",
  },
  {
    Id: 2,
    Subject: "Thule Air Crash Report",
    Location: "Newyork City",
    StartTime: "2021-01-11T06:30:00.000Z",
    EndTime: "2021-01-11T08:30:00.000Z",
    CategoryColor: "#357cd2",
  },
  {
    Id: 3,
    Subject: "Blue Moon Eclipse",
    Location: "Space Center USA",
    StartTime: "2021-01-12T04:00:00.000Z",
    EndTime: "2021-01-12T05:30:00.000Z",
    CategoryColor: "#7fa900",
  },
  {
    Id: 4,
    Subject: "Meteor Showers in 2021",
    Location: "Space Center USA",
    StartTime: "2021-01-13T07:30:00.000Z",
    EndTime: "2021-01-13T09:00:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 5,
    Subject: "Milky Way as Melting pot",
    Location: "Space Center USA",
    StartTime: "2021-01-14T06:30:00.000Z",
    EndTime: "2021-01-14T08:30:00.000Z",
    CategoryColor: "#00bdae",
  },
  {
    Id: 6,
    Subject: "Mysteries of Bermuda Triangle",
    Location: "Bermuda",
    StartTime: "2021-01-14T04:00:00.000Z",
    EndTime: "2021-01-14T05:30:00.000Z",
    CategoryColor: "#f57f17",
  },
  {
    Id: 7,
    Subject: "Glaciers and Snowflakes",
    Location: "Himalayas",
    StartTime: "2021-01-15T05:30:00.000Z",
    EndTime: "2021-01-15T07:00:00.000Z",
    CategoryColor: "#1aaa55",
  },
  {
    Id: 8,
    Subject: "Life on Mars",
    Location: "Space Center USA",
    StartTime: "2021-01-16T03:30:00.000Z",
    EndTime: "2021-01-16T04:30:00.000Z",
    CategoryColor: "#357cd2",
  },
  {
    Id: 9,
    Subject: "Alien Civilization",
    Location: "Space Center USA",
    StartTime: "2021-01-18T05:30:00.000Z",
    EndTime: "2021-01-18T07:30:00.000Z",
    CategoryColor: "#7fa900",
  },
  {
    Id: 10,
    Subject: "Wildlife Galleries",
    Location: "Africa",
    StartTime: "2021-01-20T05:30:00.000Z",
    EndTime: "2021-01-20T07:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 11,
    Subject: "Best Photography 2021",
    Location: "London",
    StartTime: "2021-01-21T04:00:00.000Z",
    EndTime: "2021-01-21T05:30:00.000Z",
    CategoryColor: "#00bdae",
  },
  {
    Id: 12,
    Subject: "Smarter Puppies",
    Location: "Sweden",
    StartTime: "2021-01-08T04:30:00.000Z",
    EndTime: "2021-01-08T06:00:00.000Z",
    CategoryColor: "#f57f17",
  },
  {
    Id: 13,
    Subject: "Myths of Andromeda Galaxy",
    Location: "Space Center USA",
    StartTime: "2021-01-06T05:00:00.000Z",
    EndTime: "2021-01-06T07:00:00.000Z",
    CategoryColor: "#1aaa55",
  },
  {
    Id: 14,
    Subject: "Aliens vs Humans",
    Location: "Research Center of USA",
    StartTime: "2021-01-05T04:30:00.000Z",
    EndTime: "2021-01-05T06:00:00.000Z",
    CategoryColor: "#357cd2",
  },
  {
    Id: 15,
    Subject: "Facts of Humming Birds",
    Location: "California",
    StartTime: "2021-01-19T04:00:00.000Z",
    EndTime: "2021-01-19T05:30:00.000Z",
    CategoryColor: "#7fa900",
  },
  {
    Id: 16,
    Subject: "Sky Gazers",
    Location: "Alaska",
    StartTime: "2021-01-22T05:30:00.000Z",
    EndTime: "2021-01-22T07:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 17,
    Subject: "The Cycle of Seasons",
    Location: "Research Center of USA",
    StartTime: "2021-01-11T00:00:00.000Z",
    EndTime: "2021-01-11T02:00:00.000Z",
    CategoryColor: "#00bdae",
  },
  {
    Id: 18,
    Subject: "Space Galaxies and Planets",
    Location: "Space Center USA",
    StartTime: "2021-01-11T11:30:00.000Z",
    EndTime: "2021-01-11T13:00:00.000Z",
    CategoryColor: "#f57f17",
  },
  {
    Id: 19,
    Subject: "Lifecycle of Bumblebee",
    Location: "San Fransisco",
    StartTime: "2021-01-14T00:30:00.000Z",
    EndTime: "2021-01-14T02:00:00.000Z",
    CategoryColor: "#7fa900",
  },
  {
    Id: 20,
    Subject: "Alien Civilization",
    Location: "Space Center USA",
    StartTime: "2021-01-14T10:30:00.000Z",
    EndTime: "2021-01-14T12:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 21,
    Subject: "Alien Civilization",
    Location: "Space Center USA",
    StartTime: "2021-01-10T08:30:00.000Z",
    EndTime: "2021-01-10T10:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 22,
    Subject: "The Cycle of Seasons",
    Location: "Research Center of USA",
    StartTime: "2021-01-12T09:00:00.000Z",
    EndTime: "2021-01-12T10:30:00.000Z",
    CategoryColor: "#00bdae",
  },
  {
    Id: 23,
    Subject: "Sky Gazers",
    Location: "Greenland",
    StartTime: "2021-01-15T09:00:00.000Z",
    EndTime: "2021-01-15T10:30:00.000Z",
    CategoryColor: "#ea7a57",
  },
  {
    Id: 24,
    Subject: "Facts of Humming Birds",
    Location: "California",
    StartTime: "2021-01-16T07:00:00.000Z",
    EndTime: "2021-01-16T09:00:00.000Z",
    CategoryColor: "#7fa900",
  },
];

export const lineChartData = [
  [
    { x: new Date(2005, 0, 1), y: 21 },
    { x: new Date(2006, 0, 1), y: 24 },
    { x: new Date(2007, 0, 1), y: 36 },
    { x: new Date(2008, 0, 1), y: 38 },
    { x: new Date(2009, 0, 1), y: 54 },
    { x: new Date(2010, 0, 1), y: 57 },
    { x: new Date(2011, 0, 1), y: 70 },
  ],
  [
    { x: new Date(2005, 0, 1), y: 28 },
    { x: new Date(2006, 0, 1), y: 44 },
    { x: new Date(2007, 0, 1), y: 48 },
    { x: new Date(2008, 0, 1), y: 50 },
    { x: new Date(2009, 0, 1), y: 66 },
    { x: new Date(2010, 0, 1), y: 78 },
    { x: new Date(2011, 0, 1), y: 84 },
  ],

  [
    { x: new Date(2005, 0, 1), y: 10 },
    { x: new Date(2006, 0, 1), y: 20 },
    { x: new Date(2007, 0, 1), y: 30 },
    { x: new Date(2008, 0, 1), y: 39 },
    { x: new Date(2009, 0, 1), y: 50 },
    { x: new Date(2010, 0, 1), y: 70 },
    { x: new Date(2011, 0, 1), y: 100 },
  ],
];
export const dropdownData = [
  {
    Id: "1",
    Time: "Janvier 2024",
  },
  {
    Id: "2",
    Time: " Février 2024",
  },
  {
    Id: "3",
    Time: "Mars 2024",
  },
];
export const lineCustomSeries = [
  {
    dataSource: lineChartData[0],
    xName: "x",
    yName: "y",
    name: "Germany",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[1],
    xName: "x",
    yName: "y",
    name: "England",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },

  {
    dataSource: lineChartData[2],
    xName: "x",
    yName: "y",
    name: "India",
    width: "2",
    marker: { visible: true, width: 10, height: 10 },
    type: "Line",
  },
];

export const pieChartData = [
  { x: "Labour", y: 18, text: "18%" },
  { x: "Legal", y: 8, text: "8%" },
  { x: "Production", y: 15, text: "15%" },
  { x: "License", y: 11, text: "11%" },
  { x: "Facilities", y: 18, text: "18%" },
  { x: "Taxes", y: 14, text: "14%" },
  { x: "Insurance", y: 16, text: "16%" },
];

export const contextMenuItems: ContextMenuItem[] = [
  "AutoFit",
  "AutoFitAll",
  "SortAscending",
  "SortDescending",
  "Copy",
  "Edit",
  "Delete",
  "Save",
  "Cancel",
  "PdfExport",
  "ExcelExport",
  "CsvExport",
  "FirstPage",
  "PrevPage",
  "LastPage",
  "NextPage",
];

export const kanbanData = [
  {
    Id: "Task 1",
    Title: "Task - 29001",
    Status: "Open",
    Summary: "Analyze the new requirements gathered from the customer.",
    Type: "Story",
    Priority: "Low",
    Tags: "Analyze,Customer",
    Estimate: 3.5,
    Assignee: "Nancy Davloio",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-low, e-nancy-davloio",
  },
  {
    Id: "Task 2",
    Title: "Task - 29002",
    Status: "InProgress",
    Summary: "Improve application performance",
    Type: "Improvement",
    Priority: "Normal",
    Tags: "Improvement",
    Estimate: 6,
    Assignee: "Andrew Fuller",
    RankId: 1,
    Color: "#673AB8",
    ClassName: "e-improvement, e-normal, e-andrew-fuller",
  },
  {
    Id: "Task 3",
    Title: "Task - 29003",
    Status: "Open",
    Summary: "Arrange a web meeting with the customer to get new requirements.",
    Type: "Others",
    Priority: "Critical",
    Tags: "Meeting",
    Estimate: 5.5,
    Assignee: "Janet Leverling",
    RankId: 2,
    Color: "#1F88E5",
    ClassName: "e-others, e-critical, e-janet-leverling",
  },
  {
    Id: "Task 4",
    Title: "Task - 29004",
    Status: "InProgress",
    Summary: "Fix the issues reported in the IE browser.",
    Type: "Bug",
    Priority: "Critical",
    Tags: "IE",
    Estimate: 2.5,
    Assignee: "Janet Leverling",
    RankId: 2,
    Color: "#E64A19",
    ClassName: "e-bug, e-release, e-janet-leverling",
  },
  {
    Id: "Task 5",
    Title: "Task - 29005",
    Status: "Review",
    Summary: "Fix the issues reported by the customer.",
    Type: "Bug",
    Priority: "Low",
    Tags: "Customer",
    Estimate: "3.5",
    Assignee: "Steven walker",
    RankId: 1,
    Color: "#E64A19",
    ClassName: "e-bug, e-low, e-steven-walker",
  },
  {
    Id: "Task 6",
    Title: "Task - 29007",
    Status: "Validate",
    Summary: "Validate new requirements",
    Type: "Improvement",
    Priority: "Low",
    Tags: "Validation",
    Estimate: 1.5,
    Assignee: "Robert King",
    RankId: 1,
    Color: "#673AB8",
    ClassName: "e-improvement, e-low, e-robert-king",
  },
  {
    Id: "Task 7",
    Title: "Task - 29009",
    Status: "Review",
    Summary: "Fix the issues reported in Safari browser.",
    Type: "Bug",
    Priority: "Critical",
    Tags: "Fix,Safari",
    Estimate: 1.5,
    Assignee: "Nancy Davloio",
    RankId: 2,
    Color: "#E64A19",
    ClassName: "e-bug, e-release, e-nancy-davloio",
  },
  {
    Id: "Task 8",
    Title: "Task - 29010",
    Status: "Close",
    Summary: "Test the application in the IE browser.",
    Type: "Story",
    Priority: "Low",
    Tags: "Review,IE",
    Estimate: 5.5,
    Assignee: "Margaret hamilt",
    RankId: 3,
    Color: "#02897B",
    ClassName: "e-story, e-low, e-margaret-hamilt",
  },
  {
    Id: "Task 9",
    Title: "Task - 29011",
    Status: "Validate",
    Summary: "Validate the issues reported by the customer.",
    Type: "Story",
    Priority: "High",
    Tags: "Validation,Fix",
    Estimate: 1,
    Assignee: "Steven walker",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-high, e-steven-walker",
  },
  {
    Id: "Task 10",
    Title: "Task - 29015",
    Status: "Open",
    Summary: "Show the retrieved data from the server in grid control.",
    Type: "Story",
    Priority: "High",
    Tags: "Database,SQL",
    Estimate: 5.5,
    Assignee: "Margaret hamilt",
    RankId: 4,
    Color: "#02897B",
    ClassName: "e-story, e-high, e-margaret-hamilt",
  },
  {
    Id: "Task 11",
    Title: "Task - 29016",
    Status: "InProgress",
    Summary: "Fix cannot open user’s default database SQL error.",
    Priority: "Critical",
    Type: "Bug",
    Tags: "Database,Sql2008",
    Estimate: 2.5,
    Assignee: "Janet Leverling",
    RankId: 4,
    Color: "#E64A19",
    ClassName: "e-bug, e-critical, e-janet-leverling",
  },
  {
    Id: "Task 12",
    Title: "Task - 29017",
    Status: "Review",
    Summary: "Fix the issues reported in data binding.",
    Type: "Story",
    Priority: "Normal",
    Tags: "Databinding",
    Estimate: "3.5",
    Assignee: "Janet Leverling",
    RankId: 4,
    Color: "#02897B",
    ClassName: "e-story, e-normal, e-janet-leverling",
  },
  {
    Id: "Task 13",
    Title: "Task - 29018",
    Status: "Close",
    Summary: "Analyze SQL server 2008 connection.",
    Type: "Story",
    Priority: "Critical",
    Tags: "Grid,Sql",
    Estimate: 2,
    Assignee: "Andrew Fuller",
    RankId: 4,
    Color: "#02897B",
    ClassName: "e-story, e-release, e-andrew-fuller",
  },
  {
    Id: "Task 14",
    Title: "Task - 29019",
    Status: "Validate",
    Summary: "Validate databinding issues.",
    Type: "Story",
    Priority: "Low",
    Tags: "Validation",
    Estimate: 1.5,
    Assignee: "Margaret hamilt",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-low, e-margaret-hamilt",
  },
  {
    Id: "Task 15",
    Title: "Task - 29020",
    Status: "Close",
    Summary: "Analyze grid control.",
    Type: "Story",
    Priority: "High",
    Tags: "Analyze",
    Estimate: 2.5,
    Assignee: "Margaret hamilt",
    RankId: 5,
    Color: "#02897B",
    ClassName: "e-story, e-high, e-margaret-hamilt",
  },
  {
    Id: "Task 16",
    Title: "Task - 29021",
    Status: "Close",
    Summary: "Stored procedure for initial data binding of the grid.",
    Type: "Others",
    Priority: "Critical",
    Tags: "Databinding",
    Estimate: 1.5,
    Assignee: "Steven walker",
    RankId: 6,
    Color: "#1F88E5",
    ClassName: "e-others, e-release, e-steven-walker",
  },
  {
    Id: "Task 17",
    Title: "Task - 29022",
    Status: "Close",
    Summary: "Analyze stored procedures.",
    Type: "Story",
    Priority: "Critical",
    Tags: "Procedures",
    Estimate: 5.5,
    Assignee: "Janet Leverling",
    RankId: 7,
    Color: "#02897B",
    ClassName: "e-story, e-release, e-janet-leverling",
  },
  {
    Id: "Task 18",
    Title: "Task - 29023",
    Status: "Validate",
    Summary: "Validate editing issues.",
    Type: "Story",
    Priority: "Critical",
    Tags: "Editing",
    Estimate: 1,
    Assignee: "Nancy Davloio",
    RankId: 1,
    Color: "#02897B",
    ClassName: "e-story, e-critical, e-nancy-davloio",
  },
  {
    Id: "Task 19",
    Title: "Task - 29024",
    Status: "Review",
    Summary: "Test editing functionality.",
    Type: "Story",
    Priority: "Normal",
    Tags: "Editing,Test",
    Estimate: 0.5,
    Assignee: "Nancy Davloio",
    RankId: 5,
    Color: "#02897B",
    ClassName: "e-story, e-normal, e-nancy-davloio",
  },
  {
    Id: "Task 20",
    Title: "Task - 29025",
    Status: "Open",
    Summary: "Enhance editing functionality.",
    Type: "Improvement",
    Priority: "Low",
    Tags: "Editing",
    Estimate: 3.5,
    Assignee: "Andrew Fuller",
    RankId: 5,
    Color: "#673AB8",
    ClassName: "e-improvement, e-low, e-andrew-fuller",
  },
  {
    Id: "Task 21",
    Title: "Task - 29026",
    Status: "InProgress",
    Summary: "Improve the performance of the editing functionality.",
    Type: "Epic",
    Priority: "High",
    Tags: "Performance",
    Estimate: 6,
    Assignee: "Nancy Davloio",
    RankId: 5,
    Color: "#e91e64",
    ClassName: "e-epic, e-high, e-nancy-davloio",
  },
  {
    Id: "Task 22",
    Title: "Task - 29027",
    Status: "Open",
    Summary: "Arrange web meeting with the customer to show editing demo.",
    Type: "Others",
    Priority: "High",
    Tags: "Meeting,Editing",
    Estimate: 5.5,
    Assignee: "Steven walker",
    RankId: 6,
    Color: "#1F88E5",
    ClassName: "e-others, e-high, e-steven-walker",
  },
  {
    Id: "Task 23",
    Title: "Task - 29029",
    Status: "Review",
    Summary: "Fix the editing issues reported by the customer.",
    Type: "Bug",
    Priority: "Low",
    Tags: "Editing,Fix",
    Estimate: "3.5",
    Assignee: "Janet Leverling",
    RankId: 6,
    Color: "#E64A19",
    ClassName: "e-bug, e-low, e-janet-leverling",
  },
  {
    Id: "Task 24",
    Title: "Task - 29030",
    Status: "Testing",
    Summary: "Fix the issues reported by the customer.",
    Type: "Bug",
    Priority: "Critical",
    Tags: "Customer",
    Estimate: "3.5",
    Assignee: "Steven walker",
    RankId: 1,
    Color: "#E64A19",
    ClassName: "e-bug, e-critical, e-steven-walker",
  },
  {
    Id: "Task 25",
    Title: "Task - 29031",
    Status: "Testing",
    Summary: "Fix the issues reported in Safari browser.",
    Type: "Bug",
    Priority: "Critical",
    Tags: "Fix,Safari",
    Estimate: 1.5,
    Assignee: "Nancy Davloio",
    RankId: 2,
    Color: "#E64A19",
    ClassName: "e-bug, e-release, e-nancy-davloio",
  },
];
