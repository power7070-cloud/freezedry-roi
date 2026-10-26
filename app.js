const $=id=>document.getElementById(id);
const UNITS={small:{price:2495,kwh:1.0,trays:4,lbs:7,hrs:24},medium:{price:3195,kwh:1.4,trays:5,lbs:11,hrs:26},large:{price:3895,kwh:1.8,trays:6,lbs:16,hrs:28},xl:{price:5095,kwh:2.4,trays:7,lbs:24,hrs:30}};
function calc(){
 const u=UNITS[$('unit').value];
 const price=+$('price').value||u.price, rate=+$('rate').value, batches=+$('batches').value;
 const value=+$('value').value, cost=+$('foodcost').value, consum=+$('consum').value;
 const kwhBatch=u.kwh*u.hrs, elec=kwhBatch*rate, consumPerBatch=consum; // bags/oxygen absorbers
 const lbsYr=u.lbs*batches*12, yieldOz=lbsYr*16*0.12; // ~12% dry weight
 const savingsBatch=u.lbs*(value-cost)-elec-consumPerBatch;
 const yearly=savingsBatch*batches*12;
 const payback=yearly>0?price/(yearly/12):Infinity;
 $('out').innerHTML=`<div class=k><b>${kwhBatch.toFixed(0)} kWh</b>per batch</div>
 <div class=k><b>$${elec.toFixed(2)}</b>electricity / batch</div>
 <div class=k><b>${lbsYr.toFixed(0)} lb</b>fresh food / yr</div>
 <div class=k><b>$${yearly.toFixed(0)}</b>net savings / yr</div>
 <div class=k big><b>${isFinite(payback)?payback.toFixed(1)+' months':'Never'}</b>payback</div>
 <div class=k><b>${(kwhBatch/ (+$('battery').value||1)).toFixed(1)}×</b>battery charges per batch</div>`;
}
function setUnit(){ $('price').value=UNITS[$('unit').value].price; calc(); }
document.addEventListener('input',e=>{ if(e.target.id==='unit') setUnit(); else calc(); });
setUnit();
