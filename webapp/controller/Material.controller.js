sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("de.assessment.controller.Material", {
        onInit() {
            if(!this.addMaterial){
                this.addMaterial = new sap.ui.xmlfragment("de.assessment.view.addMaterial",this);
                this.getView().addDependent(this.addMaterial);
                }
        },
        onNavPress:function(evt){
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("vendorDetailPage",{
                "materialId" : evt.getSource().getBindingContext("material").getProperty().materialId
            })
        },
        onAddPress:function(){
    
               var newObj = {    
               "materialId": this.getView().getModel().oData.length + 1,
               "materialName":"",
               "description":"",
               "unitOfMeasure":"",
               "currentStock":""
            };
            var materialObj = new sap.ui.model.json.JSONModel(newObj);
            this.getView().setModel(materialObj,"materialObj");
            this.addProduct.open();
        },
        onSave:function(){
            if(this.mode == "ADD"){
                this.getView().getModel().oData.push(this.getView().getModel("materialObj").oData);
                sap.m.MessageToast.show("New Material is added");
            }else{
                sap.m.MessageToast.show("Material is Updated");
            }
           
            this.getView().getModel().updateBindings(true);
            this.addProduct.close();
        },
      
           
            onCancel:function()
            {
                this.addMaterial.close();

            }
        
    });
});