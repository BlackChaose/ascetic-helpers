"use strict";

var _dtTable = require("./dtTable");

/* eslint-disable */
let obj = document.getElementById('app');
let testData = [{
  "orderCount": 1,
  "FIO": "Ivan Ivanych Petrov1",
  "IdExpert": "1000",
  "email": 'ii1@gmail.com',
  'phone': '+1 234 567 88 11'
}, {
  "orderCount": 2,
  "FIO": "Ivan Ivanych Petrov2",
  "IdExpert": "1100",
  "email": 'ii2@gmail.com',
  'phone': '+1 234 567 88 22'
}, {
  "orderCount": 3,
  "FIO": "Ivan Ivanych Petrov3",
  "IdExpert": "1200",
  "email": 'ii3@gmail.com',
  'phone': '+1 234 567 88 33'
}, {
  "orderCount": 4,
  "FIO": "Ivan Ivanych Petrov4",
  "IdExpert": "1300",
  "email": 'ii4@gmail.com',
  'phone': '+1 234 567 88 44'
}, {
  "orderCount": 5,
  "FIO": "Ivan Ivanych Petrov5",
  "IdExpert": "1400",
  "email": 'ii5@gmail.com',
  'phone': '+1 234 567 88 55'
}, {
  "orderCount": 6,
  "FIO": "Ivan Ivanych Petrov6",
  "IdExpert": "1500",
  "email": 'ii6@gmail.com',
  'phone': '+1 234 567 88 66'
}, {
  "orderCount": 7,
  "FIO": "Ivan Ivanych Petrov7",
  "IdExpert": "1600",
  "email": 'ii7@gmail.com',
  'phone': '+1 234 567 88 77'
}, {
  "orderCount": 8,
  "FIO": "Ivan Ivanych Petrov8",
  "IdExpert": "1700",
  "email": 'ii8@gmail.com',
  'phone': '+1 234 567 88 88'
}, {
  "orderCount": 9,
  "FIO": "Ivan Ivanych Petrov9",
  "IdExpert": "1800",
  "email": 'ii9@gmail.com',
  'phone': '+1 234 567 88 99'
}, {
  "orderCount": 10,
  "FIO": "Ivan Ivanych Petro10v",
  "IdExpert": "1900",
  "email": 'ii10@gmail.com',
  'phone': '+1 234 567 88 10'
}, {
  "orderCount": 11,
  "FIO": "Ivan Ivanych Petro11",
  "IdExpert": "2000",
  "email": 'ii11@gmail.com',
  'phone': '+1 234 567 88 11'
}, {
  "orderCount": 12,
  "FIO": "Ivan Ivanych Petrov12",
  "IdExpert": "2100",
  "email": 'ii12@gmail.com',
  'phone': '+1 234 567 88 12'
}, {
  "orderCount": 13,
  "FIO": "Ivan Ivanych Petrov13",
  "IdExpert": "2200",
  "email": 'ii13@gmail.com',
  'phone': '+1 234 567 88 13'
}, {
  "orderCount": 14,
  "FIO": "Ivan Ivanych Petrov14",
  "IdExpert": "2300",
  "email": 'ii14@gmail.com',
  'phone': '+1 234 567 88 14'
}, {
  "orderCount": 15,
  "FIO": "Ivan Ivanych Petrov15",
  "IdExpert": "2400",
  "email": 'ii15@gmail.com',
  'phone': '+1 234 567 88 15'
}, {
  "orderCount": 16,
  "FIO": "Ivan Ivanych Petrov16",
  "IdExpert": "2500",
  "email": 'ii16@gmail.com',
  'phone': '+1 234 567 88 16'
}, {
  "orderCount": 17,
  "FIO": "Ivan Ivanych Petrov17",
  "IdExpert": "2600",
  "email": 'ii17@gmail.com',
  'phone': '+1 234 567 88 17'
}, {
  "orderCount": 18,
  "FIO": "Ivan Ivanych Petrov18",
  "IdExpert": "2700",
  "email": 'ii18@gmail.com',
  'phone': '+1 234 567 88 18'
}, {
  "orderCount": 19,
  "FIO": "Ivan Ivanych Petrov19",
  "IdExpert": "2800",
  "email": 'ii19@gmail.com',
  'phone': '+1 234 567 88 19'
}, {
  "orderCount": 20,
  "FIO": "Ivan Ivanych Petrov20",
  "IdExpert": "2900",
  "email": 'ii20@gmail.com',
  'phone': '+1 234 567 88 20'
}];
let configTable = {
  "orderTypeDefault": "ASC",
  "orders": [{
    'orderCount': "ASC"
  }, {
    'FIO': "ASC"
  }, {
    'IdExpert': "ASC"
  }, {
    'email': "ASC"
  }, {
    'phone': "ASC"
  }],
  "rowLimit": 5,
  "headers": [{
    "orderCount": "Номер по порядку",
    "FIO": "Ф.И.О.",
    "IdExpert": "ИД эксперта",
    "email": "эл. почта",
    "phone": "телефон"
  }]
};
(0, _dtTable.runApp)(obj, configTable, testData);
/* eslint-enable */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJvYmoiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidGVzdERhdGEiLCJjb25maWdUYWJsZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTtBQUNBLElBQUlBLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLEtBQXhCLENBQVY7QUFDQSxJQUFJQyxRQUFRLEdBQUcsQ0FDYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBRGEsRUFFYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBRmEsRUFHYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBSGEsRUFJYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBSmEsRUFLYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBTGEsRUFNYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBTmEsRUFPYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBUGEsRUFRYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBUmEsRUFTYjtBQUFDLGdCQUFlLENBQWhCO0FBQW1CLFNBQVEsc0JBQTNCO0FBQW1ELGNBQVksTUFBL0Q7QUFBdUUsV0FBUyxlQUFoRjtBQUFpRyxXQUFTO0FBQTFHLENBVGEsRUFVYjtBQUFDLGdCQUFlLEVBQWhCO0FBQW9CLFNBQVEsdUJBQTVCO0FBQXFELGNBQVksTUFBakU7QUFBeUUsV0FBUyxnQkFBbEY7QUFBb0csV0FBUztBQUE3RyxDQVZhLEVBV2I7QUFBQyxnQkFBZSxFQUFoQjtBQUFvQixTQUFRLHNCQUE1QjtBQUFvRCxjQUFZLE1BQWhFO0FBQXdFLFdBQVMsZ0JBQWpGO0FBQW1HLFdBQVM7QUFBNUcsQ0FYYSxFQVliO0FBQUMsZ0JBQWUsRUFBaEI7QUFBb0IsU0FBUSx1QkFBNUI7QUFBcUQsY0FBWSxNQUFqRTtBQUF5RSxXQUFTLGdCQUFsRjtBQUFvRyxXQUFTO0FBQTdHLENBWmEsRUFhYjtBQUFDLGdCQUFlLEVBQWhCO0FBQW9CLFNBQVEsdUJBQTVCO0FBQXFELGNBQVksTUFBakU7QUFBeUUsV0FBUyxnQkFBbEY7QUFBb0csV0FBUztBQUE3RyxDQWJhLEVBY2I7QUFBQyxnQkFBZSxFQUFoQjtBQUFvQixTQUFRLHVCQUE1QjtBQUFxRCxjQUFZLE1BQWpFO0FBQXlFLFdBQVMsZ0JBQWxGO0FBQW9HLFdBQVM7QUFBN0csQ0FkYSxFQWViO0FBQUMsZ0JBQWUsRUFBaEI7QUFBb0IsU0FBUSx1QkFBNUI7QUFBcUQsY0FBWSxNQUFqRTtBQUF5RSxXQUFTLGdCQUFsRjtBQUFvRyxXQUFTO0FBQTdHLENBZmEsRUFnQmI7QUFBQyxnQkFBZSxFQUFoQjtBQUFvQixTQUFRLHVCQUE1QjtBQUFxRCxjQUFZLE1BQWpFO0FBQXlFLFdBQVMsZ0JBQWxGO0FBQW9HLFdBQVM7QUFBN0csQ0FoQmEsRUFpQmI7QUFBQyxnQkFBZSxFQUFoQjtBQUFvQixTQUFRLHVCQUE1QjtBQUFxRCxjQUFZLE1BQWpFO0FBQXlFLFdBQVMsZ0JBQWxGO0FBQW9HLFdBQVM7QUFBN0csQ0FqQmEsRUFrQmI7QUFBQyxnQkFBZSxFQUFoQjtBQUFvQixTQUFRLHVCQUE1QjtBQUFxRCxjQUFZLE1BQWpFO0FBQXlFLFdBQVMsZ0JBQWxGO0FBQW9HLFdBQVM7QUFBN0csQ0FsQmEsRUFtQmI7QUFBQyxnQkFBZSxFQUFoQjtBQUFvQixTQUFRLHVCQUE1QjtBQUFxRCxjQUFZLE1BQWpFO0FBQXlFLFdBQVMsZ0JBQWxGO0FBQW9HLFdBQVM7QUFBN0csQ0FuQmEsRUFvQmI7QUFBQyxnQkFBZSxFQUFoQjtBQUFvQixTQUFRLHVCQUE1QjtBQUFxRCxjQUFZLE1BQWpFO0FBQXlFLFdBQVMsZ0JBQWxGO0FBQW9HLFdBQVM7QUFBN0csQ0FwQmEsQ0FBZjtBQXNCQSxJQUFJQyxXQUFXLEdBQUc7QUFDaEIsc0JBQW9CLEtBREo7QUFFaEIsWUFBVSxDQUFDO0FBQUMsa0JBQWM7QUFBZixHQUFELEVBQXdCO0FBQUMsV0FBTztBQUFSLEdBQXhCLEVBQXdDO0FBQUMsZ0JBQVc7QUFBWixHQUF4QyxFQUE0RDtBQUFDLGFBQVM7QUFBVixHQUE1RCxFQUE4RTtBQUFDLGFBQVE7QUFBVCxHQUE5RSxDQUZNO0FBR2hCLGNBQVksQ0FISTtBQUloQixhQUFXLENBQUM7QUFBQyxrQkFBYyxrQkFBZjtBQUFtQyxXQUFPLFFBQTFDO0FBQW9ELGdCQUFZLGFBQWhFO0FBQStFLGFBQVMsV0FBeEY7QUFBcUcsYUFBUztBQUE5RyxHQUFEO0FBSkssQ0FBbEI7QUFPQSxxQkFBT0osR0FBUCxFQUFZSSxXQUFaLEVBQXlCRCxRQUF6QjtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcnVuQXBwIH0gZnJvbSAnLi9kdFRhYmxlJztcbi8qIGVzbGludC1kaXNhYmxlICovXG5sZXQgb2JqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xubGV0IHRlc3REYXRhID0gW1xuICB7XCJvcmRlckNvdW50XCIgOiAxLCBcIkZJT1wiIDogXCJJdmFuIEl2YW55Y2ggUGV0cm92MVwiLCBcIklkRXhwZXJ0XCI6IFwiMTAwMFwiLCBcImVtYWlsXCI6ICdpaTFAZ21haWwuY29tJywgJ3Bob25lJzogJysxIDIzNCA1NjcgODggMTEnfSxcbiAge1wib3JkZXJDb3VudFwiIDogMiwgXCJGSU9cIiA6IFwiSXZhbiBJdmFueWNoIFBldHJvdjJcIiwgXCJJZEV4cGVydFwiOiBcIjExMDBcIiwgXCJlbWFpbFwiOiAnaWkyQGdtYWlsLmNvbScsICdwaG9uZSc6ICcrMSAyMzQgNTY3IDg4IDIyJ30sXG4gIHtcIm9yZGVyQ291bnRcIiA6IDMsIFwiRklPXCIgOiBcIkl2YW4gSXZhbnljaCBQZXRyb3YzXCIsIFwiSWRFeHBlcnRcIjogXCIxMjAwXCIsIFwiZW1haWxcIjogJ2lpM0BnbWFpbC5jb20nLCAncGhvbmUnOiAnKzEgMjM0IDU2NyA4OCAzMyd9LFxuICB7XCJvcmRlckNvdW50XCIgOiA0LCBcIkZJT1wiIDogXCJJdmFuIEl2YW55Y2ggUGV0cm92NFwiLCBcIklkRXhwZXJ0XCI6IFwiMTMwMFwiLCBcImVtYWlsXCI6ICdpaTRAZ21haWwuY29tJywgJ3Bob25lJzogJysxIDIzNCA1NjcgODggNDQnfSxcbiAge1wib3JkZXJDb3VudFwiIDogNSwgXCJGSU9cIiA6IFwiSXZhbiBJdmFueWNoIFBldHJvdjVcIiwgXCJJZEV4cGVydFwiOiBcIjE0MDBcIiwgXCJlbWFpbFwiOiAnaWk1QGdtYWlsLmNvbScsICdwaG9uZSc6ICcrMSAyMzQgNTY3IDg4IDU1J30sXG4gIHtcIm9yZGVyQ291bnRcIiA6IDYsIFwiRklPXCIgOiBcIkl2YW4gSXZhbnljaCBQZXRyb3Y2XCIsIFwiSWRFeHBlcnRcIjogXCIxNTAwXCIsIFwiZW1haWxcIjogJ2lpNkBnbWFpbC5jb20nLCAncGhvbmUnOiAnKzEgMjM0IDU2NyA4OCA2Nid9LFxuICB7XCJvcmRlckNvdW50XCIgOiA3LCBcIkZJT1wiIDogXCJJdmFuIEl2YW55Y2ggUGV0cm92N1wiLCBcIklkRXhwZXJ0XCI6IFwiMTYwMFwiLCBcImVtYWlsXCI6ICdpaTdAZ21haWwuY29tJywgJ3Bob25lJzogJysxIDIzNCA1NjcgODggNzcnfSxcbiAge1wib3JkZXJDb3VudFwiIDogOCwgXCJGSU9cIiA6IFwiSXZhbiBJdmFueWNoIFBldHJvdjhcIiwgXCJJZEV4cGVydFwiOiBcIjE3MDBcIiwgXCJlbWFpbFwiOiAnaWk4QGdtYWlsLmNvbScsICdwaG9uZSc6ICcrMSAyMzQgNTY3IDg4IDg4J30sXG4gIHtcIm9yZGVyQ291bnRcIiA6IDksIFwiRklPXCIgOiBcIkl2YW4gSXZhbnljaCBQZXRyb3Y5XCIsIFwiSWRFeHBlcnRcIjogXCIxODAwXCIsIFwiZW1haWxcIjogJ2lpOUBnbWFpbC5jb20nLCAncGhvbmUnOiAnKzEgMjM0IDU2NyA4OCA5OSd9LFxuICB7XCJvcmRlckNvdW50XCIgOiAxMCwgXCJGSU9cIiA6IFwiSXZhbiBJdmFueWNoIFBldHJvMTB2XCIsIFwiSWRFeHBlcnRcIjogXCIxOTAwXCIsIFwiZW1haWxcIjogJ2lpMTBAZ21haWwuY29tJywgJ3Bob25lJzogJysxIDIzNCA1NjcgODggMTAnfSxcbiAge1wib3JkZXJDb3VudFwiIDogMTEsIFwiRklPXCIgOiBcIkl2YW4gSXZhbnljaCBQZXRybzExXCIsIFwiSWRFeHBlcnRcIjogXCIyMDAwXCIsIFwiZW1haWxcIjogJ2lpMTFAZ21haWwuY29tJywgJ3Bob25lJzogJysxIDIzNCA1NjcgODggMTEnfSxcbiAge1wib3JkZXJDb3VudFwiIDogMTIsIFwiRklPXCIgOiBcIkl2YW4gSXZhbnljaCBQZXRyb3YxMlwiLCBcIklkRXhwZXJ0XCI6IFwiMjEwMFwiLCBcImVtYWlsXCI6ICdpaTEyQGdtYWlsLmNvbScsICdwaG9uZSc6ICcrMSAyMzQgNTY3IDg4IDEyJ30sXG4gIHtcIm9yZGVyQ291bnRcIiA6IDEzLCBcIkZJT1wiIDogXCJJdmFuIEl2YW55Y2ggUGV0cm92MTNcIiwgXCJJZEV4cGVydFwiOiBcIjIyMDBcIiwgXCJlbWFpbFwiOiAnaWkxM0BnbWFpbC5jb20nLCAncGhvbmUnOiAnKzEgMjM0IDU2NyA4OCAxMyd9LFxuICB7XCJvcmRlckNvdW50XCIgOiAxNCwgXCJGSU9cIiA6IFwiSXZhbiBJdmFueWNoIFBldHJvdjE0XCIsIFwiSWRFeHBlcnRcIjogXCIyMzAwXCIsIFwiZW1haWxcIjogJ2lpMTRAZ21haWwuY29tJywgJ3Bob25lJzogJysxIDIzNCA1NjcgODggMTQnfSxcbiAge1wib3JkZXJDb3VudFwiIDogMTUsIFwiRklPXCIgOiBcIkl2YW4gSXZhbnljaCBQZXRyb3YxNVwiLCBcIklkRXhwZXJ0XCI6IFwiMjQwMFwiLCBcImVtYWlsXCI6ICdpaTE1QGdtYWlsLmNvbScsICdwaG9uZSc6ICcrMSAyMzQgNTY3IDg4IDE1J30sXG4gIHtcIm9yZGVyQ291bnRcIiA6IDE2LCBcIkZJT1wiIDogXCJJdmFuIEl2YW55Y2ggUGV0cm92MTZcIiwgXCJJZEV4cGVydFwiOiBcIjI1MDBcIiwgXCJlbWFpbFwiOiAnaWkxNkBnbWFpbC5jb20nLCAncGhvbmUnOiAnKzEgMjM0IDU2NyA4OCAxNid9LFxuICB7XCJvcmRlckNvdW50XCIgOiAxNywgXCJGSU9cIiA6IFwiSXZhbiBJdmFueWNoIFBldHJvdjE3XCIsIFwiSWRFeHBlcnRcIjogXCIyNjAwXCIsIFwiZW1haWxcIjogJ2lpMTdAZ21haWwuY29tJywgJ3Bob25lJzogJysxIDIzNCA1NjcgODggMTcnfSxcbiAge1wib3JkZXJDb3VudFwiIDogMTgsIFwiRklPXCIgOiBcIkl2YW4gSXZhbnljaCBQZXRyb3YxOFwiLCBcIklkRXhwZXJ0XCI6IFwiMjcwMFwiLCBcImVtYWlsXCI6ICdpaTE4QGdtYWlsLmNvbScsICdwaG9uZSc6ICcrMSAyMzQgNTY3IDg4IDE4J30sXG4gIHtcIm9yZGVyQ291bnRcIiA6IDE5LCBcIkZJT1wiIDogXCJJdmFuIEl2YW55Y2ggUGV0cm92MTlcIiwgXCJJZEV4cGVydFwiOiBcIjI4MDBcIiwgXCJlbWFpbFwiOiAnaWkxOUBnbWFpbC5jb20nLCAncGhvbmUnOiAnKzEgMjM0IDU2NyA4OCAxOSd9LFxuICB7XCJvcmRlckNvdW50XCIgOiAyMCwgXCJGSU9cIiA6IFwiSXZhbiBJdmFueWNoIFBldHJvdjIwXCIsIFwiSWRFeHBlcnRcIjogXCIyOTAwXCIsIFwiZW1haWxcIjogJ2lpMjBAZ21haWwuY29tJywgJ3Bob25lJzogJysxIDIzNCA1NjcgODggMjAnfSxcbl07XG5sZXQgY29uZmlnVGFibGUgPSB7XG4gIFwib3JkZXJUeXBlRGVmYXVsdFwiOiBcIkFTQ1wiLFxuICBcIm9yZGVyc1wiOiBbeydvcmRlckNvdW50JzogXCJBU0NcIn0sIHsnRklPJzogXCJBU0NcIn0sIHsnSWRFeHBlcnQnOlwiQVNDXCJ9LCB7J2VtYWlsJzogXCJBU0NcIn0sIHsncGhvbmUnOlwiQVNDXCJ9XSxcbiAgXCJyb3dMaW1pdFwiOiA1LFxuICBcImhlYWRlcnNcIjogW3tcIm9yZGVyQ291bnRcIjogXCLQndC+0LzQtdGAINC/0L4g0L/QvtGA0Y/QtNC60YNcIiwgXCJGSU9cIjogXCLQpC7QmC7Qni5cIiwgXCJJZEV4cGVydFwiOiBcItCY0JQg0Y3QutGB0L/QtdGA0YLQsFwiLCBcImVtYWlsXCI6IFwi0Y3Quy4g0L/QvtGH0YLQsFwiLCBcInBob25lXCI6IFwi0YLQtdC70LXRhNC+0L1cIn1dLFxufTtcblxucnVuQXBwKG9iaiwgY29uZmlnVGFibGUsIHRlc3REYXRhKTtcbi8qIGVzbGludC1lbmFibGUgKi9cbiJdfQ==