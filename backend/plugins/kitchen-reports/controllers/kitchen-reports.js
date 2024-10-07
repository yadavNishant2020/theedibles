'use strict';
const Excel = require('exceljs')
let Validator = require('validatorjs');
const crypto = require("crypto");

/**
 * kitchen-reports.js controller
 *
 * @description: A set of functions called "actions" of the `kitchen-reports` plugin.
 */

var kitchenReport = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.

    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },
  generate: async (ctx) => {


    let body = ctx.request.body;

    let rules = {
      date_from: 'required|date',
      date_to: 'required|date',
    };

    let validation = new Validator(body, rules);
    if (validation.fails())
      return ctx.send(validation.errors, 422);

    let datax = await kitchenReport.getDataForExport(ctx);
    let calorieIds = {}, healthIds = {};

    var data = [];
    datax.forEach((item, key) => {
      calorieIds[item.order_id.calorie] = item.order_id.calorie;
      healthIds[item.order_id.customer_health] = item.order_id.customer_health;

      data.push({
        id: item.order_id.id,
        fullName: item.order_id.customer_name,
        dietPlan: item.menu_planner.plan_type,
        mealOption: item.menu_planner.meal_type.replace(/_/g, '+'),
        breakfast: item.breakfast_dish.name,
        lunch: item.lunch_dish.name,
        snacks: item.snacks_dish.name,
        dinner: item.dinner_dish.name,
        calories: item.order_id.calorie,
        allergies: item.order_id.customer_health,
        comments: item.order_id.customer_health
      })
    });


    var allHealth = await strapi
      .services['customer-health']
      .find({id_in: Object.keys(healthIds)});

    var allCalorie = await strapi.plugins['checkout'].services.calorie
      .find({
        'id_in': Object.keys(calorieIds)
      });
    var allCalorieObj = {}, allHealthObj = {};

    allCalorie.forEach((row, key) => {
      allCalorieObj[row.id] = row;
    });

    allHealth.forEach((row, key) => {
      allHealthObj[row.id] = row;
    });


    const dataUpdated = data.map(item => {
      item.calories = allCalorieObj[item.calories].calorie ? allCalorieObj[item.calories].calorie : '';
      item.allergies = allHealthObj[item.allergies].food_allergies ? allHealthObj[item.allergies].food_allergies : '';
      item.comments = allHealthObj[item.comments].comments ? allHealthObj[item.comments].comments : '';
      return item;
    });

    console.log(dataUpdated);
// need to create a workbook object. Almost everything in ExcelJS is based off of the workbook object.
    let workbook = new Excel.Workbook();

    let worksheet = workbook.addWorksheet('Kitchen Report');

    worksheet.columns = [
      {header: 'NAME', key: 'fullName'},
      {header: 'DIET PLAN', key: 'dietPlan'},
      {header: 'MEAL OPTIONS', key: 'mealOption'},
      {header: 'BREAKFAST', key: 'breakfast'},
      {header: 'LUNCH', key: 'lunch'},
      {header: 'SNACKS', key: 'snacks'},
      {header: 'DINNER', key: 'dinner'},
      {header: 'CALORIES', key: 'calories'},
      {header: 'ALLERGIES', key: 'allergies'},
      {header: 'ADDITIONAL COMMENTS', key: 'comments'}
    ];

// force the columns to be at least as long as their header row.
// Have to take this approach because ExcelJS doesn't have an autofit property.
    worksheet.columns.forEach(column => {
      column.width = column.header.length < 12 ? 12 : column.header.length
    });

// Make the header bold.
// Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
    worksheet.getRow(1).font = {bold: true}

// Dump all the data into Excel
    dataUpdated.forEach((e, index) => {
      // row 1 is the header.
      const rowIndex = index + 2

      // By using destructuring we can easily dump all of the data into the row without doing much
      // We can add formulas pretty easily by providing the formula property.
      worksheet.addRow({
        ...e,
      })
    })
    /*

// loop through all of the rows and set the outline style.
    worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
      worksheet.getCell(`A${rowNumber}`).border = {
        top: {style: 'thin'},
        left: {style: 'thin'},
        bottom: {style: 'thin'},
        right: {style: 'none'}
      }

      const insideColumns = ['B', 'C', 'D', 'E']

      insideColumns.forEach((v) => {
        worksheet.getCell(`${v}${rowNumber}`).border = {
          top: {style: 'thin'},
          bottom: {style: 'thin'},
          left: {style: 'none'},
          right: {style: 'none'}
        }
      })

      worksheet.getCell(`F${rowNumber}`).border = {
        top: {style: 'thin'},
        left: {style: 'none'},
        bottom: {style: 'thin'},
        right: {style: 'thin'}
      }
    })

// The last A cell needs to have some of it's borders removed.
    worksheet.getCell(`A${worksheet.rowCount}`).border = {
      top: {style: 'thin'},
      left: {style: 'none'},
      bottom: {style: 'none'},
      right: {style: 'thin'}
    }
*/
    const totalCell = worksheet.getCell(`B${worksheet.rowCount}`)
    totalCell.font = {bold: true}
    totalCell.alignment = {horizontal: 'center'}

// Create a freeze pane, which means we'll always see the header as we scroll around.
    worksheet.views = [
      {state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'B2'}
    ]
    var fullPath = 'public/downloads/';
    var fileName = new Date().getTime() + '_kitchen-report.xlsx';
    var shell = require('shelljs');
    await shell.mkdir('-p', fullPath);

// Keep in mind that reading and writing is promise based.
    workbook.xlsx.writeFile(fullPath + fileName);

    return ctx.send({path: 'downloads/' + fileName})
  },
  async getDataForExport(ctx) {

    let body = ctx.request.body;

    let params = {_where: [{meal_date_gte: body.date_from}, {meal_date_lte: body.date_to}, {'order_id.payment_status': 'success'}]};

    if (body.plan_type && body.plan_type !== 'ALL') {
      params['_where'].push({'menu_planner.plan_type': body.plan_type});
    }
    return await strapi.plugins['orders'].services.orders.findOrderItems(params);
  }
};


module.exports = kitchenReport;