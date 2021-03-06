//Provide add Records to Set Memeber List

var capIDModel1 = aa.cap.getCapID("12CAP","00000","0005A").getOutput();
var capIDModel2 = aa.cap.getCapID("12CAP","00000","0005B").getOutput();
var capIDModel3 = aa.cap.getCapID("12CAP","00000","0005C").getOutput();

var setDetailsScript1 = aa.set.getSetDetailsScriptModel().getOutput();
var setDetailsScript2 = aa.set.getSetDetailsScriptModel().getOutput();
var setDetailsScript3 = aa.set.getSetDetailsScriptModel().getOutput();
var setSearchScript = aa.set.getSetDetailsScriptModel().getOutput();
var setUpdateScript = aa.set.getSetDetailsScriptModel().getOutput();

setDetailsScript1.setID1(capIDModel1.getID1());
setDetailsScript1.setID2(capIDModel1.getID2());
setDetailsScript1.setID3(capIDModel1.getID3());
setDetailsScript1.setSetID("EMSE SET1");
setDetailsScript1.setSetMemberStatus("SetMemberStatus");
setDetailsScript1.setServiceProviderCode("NYC");
setDetailsScript1.setAuditDate(aa.date.getCurrentDate())
setDetailsScript1.setAuditID("Admin")
setDetailsScript1.setAuditStatus("A");

setDetailsScript2.setID1(capIDModel2.getID1());
setDetailsScript2.setID2(capIDModel2.getID2());
setDetailsScript2.setID3(capIDModel2.getID3());
setDetailsScript2.setSetID("EMSE SET2");
setDetailsScript2.setSetMemberStatus("SetMemberStatus");
setDetailsScript2.setServiceProviderCode("NYC");
setDetailsScript2.setAuditDate(aa.date.getCurrentDate())
setDetailsScript2.setAuditID("Admin")
setDetailsScript2.setAuditStatus("A");

setDetailsScript3.setID1(capIDModel3.getID1());
setDetailsScript3.setID2(capIDModel3.getID2());
setDetailsScript3.setID3(capIDModel3.getID3());
setDetailsScript3.setSetID("EMSE SET3");
setDetailsScript3.setSetMemberStatus("SetMemberStatus");
setDetailsScript3.setServiceProviderCode("NYC");
setDetailsScript3.setAuditDate(aa.date.getCurrentDate())
setDetailsScript3.setAuditID("Admin")
setDetailsScript3.setAuditStatus("A");

var arrayList = aa.util.newArrayList();
arrayList.add(setDetailsScript1.getSetDetailsModel());
arrayList.add(setDetailsScript2.getSetDetailsModel());
arrayList.add(setDetailsScript3.getSetDetailsModel());

var addSetDetailsScript = aa.set.addRecordSetMembers(arrayList);
if (addSetDetailsScript.getSuccess())
{
	aa.print("addSetMembers Successfully");
}
else
{
	aa.print("addSetMembers Failed!");
	aa.print(addSetDetailsScript.getErrorMessage());	
}


