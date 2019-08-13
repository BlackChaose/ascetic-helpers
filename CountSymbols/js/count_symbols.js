/*fixme!!*/
	 var ascCS = {};
	 ascCS.init=function(config){
		 this.ascCS.config.inputType=config.inputType;
		 this.ascCS.config.inputName=config.inputName;
		 this.ascCS.config.inputDataType=config.inputDataType;
		 this.ascCS.config.inputNumSymbolsMin=config.inputNumSymbolsMin;
		 this.ascCS.config.inputNumSymbolsMax=config.inputNumSymbolsMax;
		 this.ascCS.config.inputMinColor=config.inputMinColor;
		 this.ascCS.config.inputMaxColor=config.inputMaxColor;
		 this.ascCS.config.directCnt=config.directCnt;		 
		 };
	 ascCS.showConfig = function(){
		 console.log(this.ascCS.config);
		 };	 


