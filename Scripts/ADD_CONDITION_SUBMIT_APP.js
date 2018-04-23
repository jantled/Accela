/*---- User intial parameters ----*/
var requiredType = aa.util.newArrayList();
var documentGroup = "ALAN.HU";

requiredType.add("test");
requiredType.add("Photos");

var cond_type = "Required Documents";
var cond_name = "Required Documents to Pass Plan Review";


/*---- User intial parameters end----*/

/*---- Inital environment parameters ----*/
var s_id1 = aa.env.getValue("PermitId1");
var s_id2 = aa.env.getValue("PermitId2");
var s_id3 = aa.env.getValue("PermitId3");
var userID = aa.env.getValue("CurrentUserID");

var capIDModel = aa.cap.getCapIDModel(s_id1, s_id2, s_id3).getOutput();
var servProvCode = capIDModel.getServiceProviderCode();

function main()
{
	var documentList = aa.document.getDocumentListByEntity(capIDModel.toString(), "CAP").getOutput();
	var count = 0;
	if(documentList != null && documentList.size() > 0)
	{
		for(var i = 0; i < documentList.size(); i++)
		{
			var documentModel = documentList.get(i);

			if (documentGroup == documentModel.getDocGroup())
			{
				var docCategory = documentModel.getDocCategory();
				if(docCategory != null && docCategory != "")
				{
					for(var j =0 ; j < requiredType.size(); j ++)
					{
						if(docCategory.equalsIgnoreCase(requiredType.get(j)))
						{
							requiredType.set(j, "");
							count = count + 1;
							break;
						}
					}
				}
			}
		}
	}
	
	if (requiredType.size() > count)
	{
		addCapCondition();
	}
	
}


function addCapCondition()
{
	var stdcondition = aa.capCondition.getStandardConditions(cond_type, cond_name).getOutput();

	var capConditionModel = aa.capCondition.getNewConditionScriptModel().getOutput();
	var sysUserModel = aa.people.getSysUserByID(userID).getOutput();
	capConditionModel.setIssuedByUser(sysUserModel);
	capConditionModel.setCapID(capIDModel);
	capConditionModel.setServiceProviderCode(servProvCode);
	
	aa.condition.createConditionFromStdCondition(capConditionModel, stdcondition[0].getConditionNbr());

}


aa.env.setValue("ScriptReturnCode","0");
aa.env.setValue("ScriptReturnMessage", "successful");
main();

