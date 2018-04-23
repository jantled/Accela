//Description:
//This sample script is used to update a public user AA account and associate disciplines for this user after connect a license. 
//Event Name: AddContractLicenseAfter
//-----------------------------------------------------------------------------------------------------------
aa.print("-------------------START--------");
var publicUserSeqNum= aa.env.getValue("publicUserSeqNum");
var seletedContratorLicenseList = aa.env.getValue("seletedContratorLicenseList");
var userModel = aa.publicUser.getUserModel().getOutput();
// Get a DisciplineModel instance as 
var userDisciplineModel = aa.publicUser.getUserDisciplineModel().getOutput();
var userDistrictModel = aa.publicUser.getUserDistrictModel().getOutput();

var userName = "PUBLICUSER" + publicUserSeqNum;

userModel.setUserName(userName);
//Get current public user AA account.
var dbUserModel = aa.publicUser.getPublicUserAAAccount(userModel).getOutput();

if (dbUserModel != null)
{
	dbUserModel.setStatus("ENABLE");
  dbUserModel.setInspector("Y");
  dbUserModel.setDailyInspUnits(5);
  //update current public user AA account.
  aa.publicUser.updatePublicUserAAAccount(dbUserModel);
}


for (var i = 0;i <seletedContratorLicenseList.size();i++)
{
	// If LP type is 'Boilermaker', set the discipline as 'Boiler' and District is 'East'.
	var  lpType = seletedContratorLicenseList.get(i).getLicenseType();
	if ( lpType == 'Boilermaker')
	{
		 // Add Discipline to public user.
		 // Set PU AA account Discipline attribute "Boiler"
		 userDisciplineModel.setDiscipline("Boiler");
     userDisciplineModel.setUserId(userName);
     userDisciplineModel.setRecFulNam("PUBLICUSER");
     // Check the Discipline whether have been assigned, if not, create a new one.
     var dbuserDisciplines = aa.publicUser.getPublicUserAAAccountDisciplines(userDisciplineModel).getOutput();
      // If discipline have associate with current publicuser, don't create again.
     if (dbuserDisciplines == null || dbuserDisciplines.size() == 0)
     {
     	  aa.publicUser.addPublicUserAAAccountDiscipline(userDisciplineModel);
     	  aa.print(userDisciplineModel.getUserId() + " is set the discipline as "+ userDisciplineModel.getDiscipline() + " successfully.");
     }
     else
     {
     	  aa.print("Assign discipline fail, " + userDisciplineModel.getUserId() + " have already been set the discipline as "+ userDisciplineModel.getDiscipline());
     }
     
      // Add District to public user
      // Set PU AA account District attribute "East" 
     userDistrictModel.setUserName(userName);
     userDistrictModel.setRecFulName("PUBLICUSER");
     userDistrictModel.setDistrict("East");
     
     var dbuserDistricts = aa.publicUser.getPublicUserDistrict(userDistrictModel).getOutput();
     // If district have associate with current publicuser, don't create again.
     if (dbuserDistricts == null || dbuserDistricts.size() ==0)
     {
     	  aa.publicUser.createPublicUserDistrict(userDistrictModel);
     	  aa.print(userDistrictModel.getUserName() + " is set the district as "+ userDistrictModel.getDistrict() + " successfully.");
     }
     else
     {
     	 aa.print("Assign distict fail, " + userDistrictModel.getUserName() + " have already been set the district as "+ userDistrictModel.getDistrict());
     }
     
	}
	else if ( lpType == 'Other Type')
	{
		 // Add Discipline to public user
		 // Set Public user AA account Discipline attribute (=Other) 
		 userDisciplineModel.setDiscipline("Other");
     userDisciplineModel.setUserId(userName);
     userDisciplineModel.setRecFulNam("PUBLICUSER");
      // Check the Discipline whether have been assigned, if not, create a new one.
     var dbuserDisciplines = aa.publicUser.getPublicUserAAAccountDisciplines(userDisciplineModel).getOutput();
     // If discipline have associate with current publicuser, don't create again.
     if (dbuserDisciplines == null || dbuserDisciplines.size() == 0)
     {
     	  aa.publicUser.addPublicUserAAAccountDiscipline(userDisciplineModel);
     	  aa.print(userDisciplineModel.getUserId() + " is set the discipline as "+ userDisciplineModel.getDiscipline() + " successfully.");
     }
     else
     {
     	  aa.print("Assign discipline fail, " + userDisciplineModel.getUserId() + " have already been set the discipline as "+ userDisciplineModel.getDiscipline());
     }
     
      // Add District to public user
      // Set Public user AA account District attribute (=West) 
     userDistrictModel.setUserName(userName);
     userDistrictModel.setRecFulName("PUBLICUSER");
     userDistrictModel.setDistrict("West");
     
     var dbuserDistricts = aa.publicUser.getPublicUserDistrict(userDistrictModel).getOutput();
     // If district have associate with current publicuser, don't create again.
      if (dbuserDistricts == null || dbuserDistricts.size() ==0)
     {
     	  aa.publicUser.createPublicUserDistrict(userDistrictModel);
     	   aa.print(userDistrictModel.getUserName() + " is set the district as "+ userDistrictModel.getDistrict() + " successfully.");
     }
     else
     {
     	 aa.print("Assign distict fail, " + userDistrictModel.getUserName() + " have already been set the district as "+ userDistrictModel.getDistrict());
     }
	}
	// else if ()...
}

aa.env.setValue("ScriptReturnCode","0");
aa.env.setValue("ScriptReturnMessage","Set public user district and discipline finish.");
