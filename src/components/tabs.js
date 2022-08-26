import React from "react";
import AddForm from './form';
import ExpList from './expList';


function Tabs(tabsNames){
    const tabs = tabsNames.tabsNames.split(',');

    function tabHandler(index){
        const tabs = document.querySelectorAll('.tabContent');
        const tabsList = Array.from(tabs);
        tabsList.map( (tab) => {
            tab.classList.add('hideTab')
        })

        const tabsH = document.querySelectorAll('.tabsHandlers');
        const tabsHList = Array.from(tabsH);
        tabsHList.map( (tabH) => {
            tabH.classList.remove('selected')
        })

        const tab = document.querySelector("#tab"+index);
        tab.classList.remove('hideTab');

        const tabHSel = document.querySelector("#tabH"+index);
        tabHSel.classList.add('selected');
    };
    
    

    return(
        <>
            <div className='tabs'>
                { tabs.map( (name, index) => (     
                    <span className={index == 0 ? 'tabsHandlers selected' : 'tabsHandlers' }  id={`tabH`+index} key={index} onClick={() => tabHandler(index)} >{name}</span>                 
                ))}
            </div>

            <div id='tab0' className='tabContent'>
                <AddForm />
            </div>
            <div id='tab1' className='tabContent hideTab'>
                <ExpList />
            </div>
        </>

    )
}
export default Tabs;