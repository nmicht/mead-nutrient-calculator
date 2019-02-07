(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a(26)},,,,,,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){},,function(e,t,a){"use strict";a.r(t);var n=a(1),r=a(8),l=a(2),i=a(3),u=a(5),c=a(4),o=a(6),d=a(0),s=a.n(d),m=a(9),h=a.n(m);a(16);function p(e){return s.a.createElement("div",{className:"input-group"},s.a.createElement("label",{htmlFor:e.id},e.label,s.a.createElement("span",{className:"help-text"},e.helpText)),s.a.createElement("input",{id:e.id,name:e.name,value:e.value,defaultChecked:e.defaultChecked,placeholder:e.placeholder,type:e.type,required:e.required?"required":"",onChange:function(t){return e.onChange(t)},max:e.max,min:e.min,step:e.step}))}a(18);function v(e){var t=e.options.map(function(t){return s.a.createElement(p,{key:e.id+t.value,id:e.id+t.value,name:e.id,type:e.type,defaultChecked:e.value===t.value,onChange:function(t){return e.onChange(t)},required:e.required,placeholder:e.placeholder,value:t.value,label:t.text})});return s.a.createElement("div",{className:"input-radio-group"},s.a.createElement("fieldset",null,s.a.createElement("legend",null,e.label),s.a.createElement("span",{className:"help-text"},e.helpText),t))}a(20);function g(e){return s.a.createElement("div",{className:"range-group"},s.a.createElement("label",{htmlFor:e.id},e.label,s.a.createElement("span",{className:"help-text"},e.helpText)),s.a.createElement("div",null,s.a.createElement("span",{className:"label-min"},e.min),s.a.createElement("input",{className:"count"+e.max,id:e.id,name:e.name,value:e.value,defaultChecked:e.defaultChecked,placeholder:e.placeholder,type:e.type,required:e.required?"required":"",onChange:function(t){return e.onChange(t)},max:e.max,min:e.min,step:e.step}),s.a.createElement("span",{className:"label-min"},e.max)))}a(22);function f(e){var t=e.options.map(function(t){return s.a.createElement("option",{key:e.id+t.text,value:t.value,onChange:function(t){return e.onChange(t)}},t.text)});return s.a.createElement("div",{className:"select-group"},s.a.createElement("label",{htmlFor:e.id},e.label,s.a.createElement("span",{className:"help-text"},e.helpText)),s.a.createElement("select",{id:e.id,name:e.name,value:e.value,required:e.required,onChange:e.onChange},t))}a(24);var x=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(o.a)(t,e),Object(i.a)(t,[{key:"renderInput",value:function(e,t){return"radio"===e.type||"checkbox"===e.type?s.a.createElement(v,Object.assign({key:e.id},e,{value:t,onChange:function(t){return e.onChange(t)}})):"range"===e.type?s.a.createElement(g,Object.assign({key:e.id},e,{value:t,name:e.id,onChange:function(t){return e.onChange(t)}})):"select"===e.type?s.a.createElement(f,Object.assign({key:e.id},e,{value:t,onChange:function(t){return e.onChange(t)}})):s.a.createElement(p,Object.assign({key:e.id},e,{value:t,name:e.id,onChange:function(t){return e.onChange(t)}}))}},{key:"render",value:function(){var e=this,t=this.props.fields.map(function(t){return e.renderInput(t,e.props.inputs[t.id])});return s.a.createElement("div",null,s.a.createElement("form",null,t))}}]),t}(s.a.Component),y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(c.a)(t).call(this,e))).handleChange=function(e){a.setState({inputs:Object(r.a)({},a.state.inputs,Object(n.a)({},e.target.name,e.target.value))})},a.state={inputs:{batchSizeUnit:1,nutrientPreference:50,batchSize:"",startingGravity:"",yeastSelection:"Lalvin 71B",fruitSpecificGravity:"",overrideYeastPitchRate:"",metricYeastPitchRateOverride:""},results:{totalNutrientNeedGrams:0,goFermWaterNeedLt:0,goFermNeedOz:0,goFermNeedGram:0,goFermWaterNeedMl:0,yeastNeed:0,totalNutrientNeedOz:0,nutrientStepGrams:0,nutrientStepOz:0,yeastPitchRate:0,startingGravityBrix:0,fruitSugarPercentage:0,sugarBreak:0,recommendedYeastPitchRateLt:0}},a.form={fields:[{id:"batchSizeUnit",label:"Unit of Measure for Batch Size",helpText:"The unit you are using for your batch size.",type:"radio",required:!0,options:[{text:"gallons",value:1},{text:"liters",value:2}],onChange:a.handleChange},{id:"nutrientPreference",label:"Nutrient Preference",helpText:"Fermaid-O provides organic form of nitrogen, while Fermaid-K provides inorganic forms of nitrogen.",type:"radio",required:!0,options:[{text:"Fermaid-O",value:50},{text:"Fermaid-K",value:100}],onChange:a.handleChange},{id:"batchSize",label:"Batch Size",helpText:"How big or small is your batch.",placeholder:1,type:"number",required:!0,onChange:a.handleChange},{id:"startingGravity",label:"Starting Gravity",placeholder:1.1,helpText:"Example: 1.115",type:"number",step:.001,required:!0,onChange:a.handleChange},{id:"yeastSelection",label:"Yeast Selection",helpText:"Each yeast provides a different requirement of nutrient.",type:"select",required:!0,options:[{value:"0.75",text:"Lalvin 71B"},{value:"1.25",text:"Lalvin BA 11"},{value:"0.9",text:"Lalvin BM45"},{value:"1.25",text:"Lalvin BM4X4"},{value:"0.9",text:"Lalvin CLOS"},{value:"1.25",text:"Lalvin CY3079"},{value:"0.9",text:"Lalvin D21"},{value:"0.9",text:"Lalvin D254"},{value:"0.75",text:"Lalvin D47"},{value:"0.9",text:"Lalvin D80"},{value:"0.75",text:"Lalvin DV10"},{value:"0.75",text:"Lalvin EC-1118"},{value:"0.9",text:"Lalvin K1V-1116"},{value:"0.75",text:"Lalvin QA23"},{value:"0.9",text:"Lalvin R2"},{value:"0.9",text:"Lalvin RC212"},{value:"1.25",text:"Lalvin Rhone 2226"},{value:"1.25",text:"Red Star Cote Des Blancs"},{value:"0.75",text:"Red Star Montrachet"},{value:"0.75",text:"Red Star Pasteur Champange"},{value:"0.9",text:"Red Star Pasteur Red"},{value:"0.9",text:"Red Star Premier Cuvee"},{value:"0.75",text:"Uvaferm 43"},{value:"0.9",text:"Uvaferm BDX"},{value:"0.9",text:"Uvaferm SVG"},{value:"0.9",text:"Uvaferm VRB"},{value:"0.75",text:"Other Low N Requirement"},{value:"0.9",text:"Other Medium N Requirement"},{value:"1.25",text:"Other High N Requirement"},{value:"0.75",text:"Ale / Lager Yeast"}],onChange:a.handleChange},{id:"fruitSpecificGravity",label:"Specific Gravity of Fruit",placeholder:0,helpText:"Example: 1.035 (only if fermenting fruit in primary)",type:"number",step:.001,required:!1,onChange:a.handleChange},{id:"overrideYeastPitchRate",label:"Override Yeast Pitch Rate",min:0,max:10,step:.5,helpText:"Enter your preferred grams of yeast per gallon",type:"range",required:!1,onChange:a.handleChange},{id:"metricYeastPitchRateOverride",label:"Metric Yeast Pitch Rate Override",helpText:"Enter your preferred grams of yeast per liter",type:"range",min:0,max:3,step:.25,required:!1,onChange:a.handleChange}]},a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h3",null,"Mead Nutrient Calculator"),s.a.createElement(x,Object.assign({inputs:this.state.inputs},this.form)))}}]),t}(s.a.Component);h.a.render(s.a.createElement(y,null),document.getElementById("root"))}],[[10,2,1]]]);
//# sourceMappingURL=main.cb0f82d8.chunk.js.map