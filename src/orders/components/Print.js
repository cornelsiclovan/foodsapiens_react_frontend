import React, {useEffect, useState} from 'react';
import { clearBuffer, setLabelId, setWidth, drawDeviceFont, draw1DBarcode,
		 drawBlock, drawVectorFont, printBuffer, getLabelData } from './bxllabel';

import {requestPrint, viewResult} from './bxlcommon.js';

const Print = (props) => {
	
	let _inch = 2;
	let rotation = 3;
	let issueID = 1;
	
	const changeLabelInch = () => {
		_inch = 2;
	}
	
	const viewResult = (result) => {
		_inch = 2;
	}
	
	const PrintLabel = (e) => {
		e.preventDefault();	
			
		setLabelId(issueID);
		clearBuffer();
		
		if(_inch == 2) {
			// 2inch sample
			setWidth(380);
			drawDeviceFont(props.item
							,10,15,"0",2,2,0,0,0,0);
			drawDeviceFont(props.name,10,220,"0",2,2,0,0,1,0);
			drawDeviceFont(props.calorii,10,260,"0",2,2,0,0,1,0);
			//draw1DBarcode("1234567890",10,180,1,3,2,96,0,3);
			//drawBlock(10,60,350,160,"B",5);
			//drawVectorFont("Vector Font",10,350,"U",40,40,0,0,1,0,0,0,false);
		} else if(_inch == 3) {
			// 3inch sample
			setWidth(576);
			drawDeviceFont("1234567890",10,15,"0",2,2,0,0,0,0);

			drawDeviceFont("Sample",10,40,"2",4,4,0,0,1,0);
			draw1DBarcode("1234567890",10,180,1,3,2,96,0,3);
			drawBlock(10,60,556,170,"B",5);
			drawVectorFont("Vector Font",10,350,"U",40,40,0,0,1,0,0,0,false);
		} else if(_inch == 4) {
			// 4inch sample
			setWidth(832);
			drawDeviceFont("1234567890",10,15,"0",2,2,0,0,0,0);

			drawDeviceFont("Sample",10,40,"2",4,4,0,0,1,0);
			draw1DBarcode("1234567890",10,180,1,3,2,96,0,3);
			drawBlock(10,60,800,170,"B",5);
			drawVectorFont("Vector Font",10,350,"U",40,40,0,0,1,0,0,0,false);
		} else {
			// error
			return;
		}

		printBuffer();
		
		var strSubmit = getLabelData();

		console.log(strSubmit);

		issueID++;
		requestPrint("Printer1", strSubmit, viewResult);
		
	}
	
	return (
		<React.Fragment>
		
			<a href="" style={{
                    backgroundColor: 'yellowgreen', 
                    color: 'white', 
                    textDecoration: 'none',
                    padding: 3+'px',
                    borderRadius: 5 + 'px' 
                    }} id="print_bt" class="ripple" onClick={PrintLabel}>
			print
		</a>
		</React.Fragment>
	)
}

export default Print;