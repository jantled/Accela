var capID = "14CAP-00000-00B7A";
var capIDModel = aa.cap.getCapIDModel('14CAP', '00000', '00B7A').getOutput();

// table name
var tableName = "BUNNIASIT";
// rows data, element is Map<columnName, columnValue>.
var testAsitFieldArray = [];
//Create a map to save the field and value map.
// row 1
var asitFieldsRow1 = aa.util.newHashMap(); // Map<columnName, columnValue>
asitFieldsRow1.put("column1","123");
asitFieldsRow1.put("column2","223");
asitFieldsRow1.put("clomm3","333");
testAsitFieldArray.push(asitFieldsRow1);
// row 2
var asitFieldsRow2 = aa.util.newHashMap();
asitFieldsRow2.put("column1","aaa");
asitFieldsRow2.put("column2","bbb");
asitFieldsRow2.put("clomm3","ccc");
testAsitFieldArray.push(asitFieldsRow2);

// add asit data 
addAppSpecificTableInfors(tableName, capIDModel, testAsitFieldArray);



/**
* Add ASIT rows data, format: Array[Map<columnName, columnValue>]
**/
function addAppSpecificTableInfors(tableName, capIDModel, asitFieldArray/** Array[Map<columnName, columnValue>] **/)
{
	if (asitFieldArray == null || asitFieldArray.length == 0)
	{
		return;
	}
	
	var asitTableScriptModel = aa.appSpecificTableScript.createTableScriptModel();
	var asitTableModel = asitTableScriptModel.getTabelModel();
	var rowList = asitTableModel.getRows();
	asitTableModel.setSubGroup(tableName);
	for (var i = 0; i < asitFieldArray.length; i++)
	{
		var rowScriptModel = aa.appSpecificTableScript.createRowScriptModel();
		var rowModel = rowScriptModel.getRow();
		rowModel.setFields(asitFieldArray[i]);
		rowList.add(rowModel);
	}
	return aa.appSpecificTableScript.addAppSpecificTableInfors(capIDModel, asitTableModel);
}
aa.print("success");


/**  // add asit data 
var capID = "14CAP-00000-00B7A";
var capIDModel = aa.cap.getCapIDModel('14CAP', '00000', '00B7A').getOutput();
// table name
var tableName = "BUNNIASIT";
var asitTableScriptModel = aa.appSpecificTableScript.createTableScriptModel();
var asitTableModel = asitTableScriptModel.getTabelModel();
var rowList = asitTableModel.getRows();
asitTableModel.setSubGroup(tableName);
var rowScriptModel = aa.appSpecificTableScript.createRowScriptModel();
var rowObject = rowScriptModel.getRow();
// Create a map to save the field and value map.
// row 1
var asitFields1 = aa.util.newHashMap();
asitFields1.put("column1","123");
asitFields1.put("column2","223");
asitFields1.put("clomm3","333");
//Set the Map to row object.
rowObject.setFields(asitFields1);
//add the row object to AIST Table object.
rowList.add(rowObject);

rowScriptModel = aa.appSpecificTableScript.createRowScriptModel();
rowObject = rowScriptModel.getRow();
var asitFields2 = aa.util.newHashMap();
asitFields2.put("column1","aaa");
asitFields2.put("column2","bbb");
asitFields2.put("clomm3","ccc");
//Set the Map to row object.
rowObject.setFields(asitFields2);
//add the row object to AIST Table object.
rowList.add(rowObject);

aa.appSpecificTableScript.addAppSpecificTableInfors(capIDModel, asitTableModel);
**/
