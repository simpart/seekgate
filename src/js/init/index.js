/* require */
require('expose-loader?app!../conf/namesp.js');
require('mofron');
const AppBase=require("mofron-comp-appbase");
const Text=require("mofron-comp-text");
const HrzPos=require("mofron-effect-hrzpos");
const Click=require("mofron-event-click");
const SlideMenu=require("mofron-comp-slidemenu");
const TxtFrame=require("mofron-comp-txtframe");
const Frame=require("mofron-comp-frame");
const Image=require("mofron-comp-image");
const SynwWid=require("mofron-effect-synwwid");
const VrtPos=require("mofron-effect-vrtpos");
const Grid=require("mofron-layout-grid");
const Circle=require("mofron-comp-circle");
const Color=require("mofron-effect-color");
const comutl=mofron.util.common;
const cmputl=mofron.util.component;
try {
    /* access */
    if(true===mofron.util.common.chkacc({device:'mobile'})){
        if(true===mofron.window.isPortrait()){
            document.documentElement.setAttribute('style','font-size:1500%;');
        }
        mofron.window.portraitEvent(()=>{document.documentElement.setAttribute('style','font-size:1500%;');});
    }
    if(true===mofron.util.common.chkacc({device:'mobile'})){
        if(true===mofron.window.isLandscape()){
            document.documentElement.setAttribute('style','font-size:800%;');
        }
        mofron.window.landscapeEvent(()=>{document.documentElement.setAttribute('style','font-size:800%;');});
    }
    if(true===mofron.util.common.chkacc({device:'tablet'})){
        document.documentElement.setAttribute('style','font-size:800%;');
    }
    if(true===mofron.util.common.chkacc({device:'display'})){
        document.documentElement.setAttribute('style','font-size:625%;');
    }

    /* script (external) */
    let moni={
        start:()=>{
            
            //if (null === wsock) {
            //    wsock = new WebSocket('ws:/'+ location.host +':5000');
            //    wsock.addEventListener('open', (e) => {
            //        ws_conn = true;
            //    });
            //    wsock.addEventListener('message', msgrsv);
            //    
            //    setTimeout(
            //        () => {
            //            if (false === ws_conn) {
            //                alert("connection error " + 'ws:/'+ location.host +':5000');
            //            }
            //        },
            //        1000
            //    );
            //}
            
            sby.visible(false);
            act.visible(true);
        },
        stop:()=>{
            
            //if (null !== wsock) {
            //    wsock.close();
            //    wsock = null;
            //}
            
            act.visible(false);
            sby.visible(true);
        },
    }
    let temp={
        start:()=>{
            temp_val.text("");
        },
        stop:()=>{
            temp_val.text("-");
        },
    }
    let swch={
        start:()=>{
            swcir.execEffect(2);
            dsc_txt.visible(false);
        },
        stop:()=>{
            swcir.execEffect(3);
            dsc_txt.visible(true);
        },
    }

    /* script (init) */
    class Thermo{constructor(t){try{if(!0!==Array.isArray(t))throw new Error("invalid parameter");this.m_cmpctl=t,this.m_status=!1,this.m_wsock=null}catch(t){throw console.error(t.stack),t}}status(){return this.m_status}switching(t){try{if("boolean"!=typeof t)throw new Error("invalid parameter");!0===t?this.ws_connect():null!==this.m_wsock&&(this.m_wsock.close(),this.m_wsock=null);for(let s in this.m_cmpctl)!0===t?this.m_cmpctl[s].start():this.m_cmpctl[s].stop();this.m_status=t}catch(t){throw console.error(t.stack),t}}ws_connect(){try{this.m_wsock=new WebSocket("ws:/"+location.host+":5000");let t=!1;this.m_wsock.addEventListener("open",s=>{t=!0}),setTimeout(()=>{!1===t&&alert("connection failed: ws:/"+location.host+":5000")},1e3),this.m_wsock.addEventListener("message",this.ws_message)}catch(t){throw console.error(t.stack),t}}ws_message(t){try{let s=JSON.parse(t.data);act.base64("data:image/bmp;base64,"+s.image),temp_val.text(s.temp+"")}catch(t){throw console.error(t.stack),t}}}
    let thermo = new Thermo([moni, temp, swch]);
    let sw_evt = () => {
        try {
            thermo.switching(!thermo.status());
        } catch (e) {
            console.error(e.stack);
        }
    }
    let bar_evt= () => {
        menu_cmp.visible(true);
    }
    let mnu_cls= () => {
        menu_cmp.visible(false);
    }
    let sel_evt= () => {
        console.log("select");
    }
    let msgrsv = (msg) => {
        try {
            let srv_ret = JSON.parse(msg.data);
            act.base64("data:image/bmp;base64," + srv_ret.image);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /* template */

    let menu_cmp_0=new Text();
    let menu_cmp=new SlideMenu();
    let sby_0=new Image();
    let sby=new Frame();
    let act=new Image();
    let cmp0_0=new mofron.class.Component();
    let temp_val=new Text("-");
    let cmp0_1_0=new mofron.class.Component();
    let cmp0_1_1_0=new Text("℃");
    let cmp0_1_1=new mofron.class.Component();
    let cmp0_1=new mofron.class.Component();
    let swcir_0=new Image();
    let swcir=new Circle();
    let dsc_txt=new Text("Tap to Start");
    let cmp0_2_0=new mofron.class.Component();
    let cmp0_2=new mofron.class.Component();
    let cmp0=new AppBase();
    let menu_cmp_1=new TxtFrame();
    let menu_cmp_2=new TxtFrame();
    let menu_cmp_3=new TxtFrame();
    let menu_cmp_4=new TxtFrame();
    let sby_0_0=new HrzPos();
    let sby_0_1=new VrtPos();
    let swcir_0_0=new HrzPos();
    let swcir_0_1=new VrtPos();
    let swcir_1=new HrzPos();
    let swcir_2=new Color([80,80,250]);
    let swcir_3=new Color([250,80,80]);
    let cmp0_3=new Text("&equiv;");
    cmp0.child([menu_cmp,cmp0_0,cmp0_1,cmp0_2]);
    cmp0_2.child([swcir,cmp0_2_0]);
    cmp0_2_0.child([dsc_txt]);
    swcir.child([swcir_0]);
    cmp0_1.child([cmp0_1_0,cmp0_1_1]);
    cmp0_1_1.child([cmp0_1_1_0]);
    cmp0_1_0.child([temp_val]);
    cmp0_0.child([sby,act]);
    sby.child([sby_0]);
    menu_cmp.child([menu_cmp_0]);
    menu_cmp_0.config({effect:new HrzPos(),event:new Click(mnu_cls),style:new mofron.class.ConfArg({'margin-top':'0.3rem','position':'absolute'},{'lock':true}),text:"&times;&nbsp;CLOSE"});
    menu_cmp_1.config({baseColor:[245,255,245],text:new mofron.class.ConfArg("Notify",{size:"0.2rem"})});
    menu_cmp_2.config({baseColor:[245,255,245],text:new mofron.class.ConfArg("Threshold",{size:"0.2rem"})});
    menu_cmp_3.config({baseColor:[245,255,245],text:new mofron.class.ConfArg("Log",{size:"0.2rem"})});
    menu_cmp_4.config({baseColor:[245,255,245],text:new mofron.class.ConfArg("FullScreen",{size:"0.2rem"})});
    menu_cmp.config({objkey:"menu_cmp",offset:"-0.01rem",position:"right",baseColor:[230,255,230],select:-1,reselect:true,selectEvent:sel_evt,style:{'padding-top':'0.8rem'},item:new mofron.class.ConfArg([menu_cmp_1,menu_cmp_2,menu_cmp_3,menu_cmp_4],{size:new mofron.class.ConfArg("2rem","0.5rem")})});
    sby_0.config({src:"./img/standby.png",effect:[sby_0_0,sby_0_1]});
    sby.config({objkey:"sby",effect:new SynwWid(),baseColor:[220,220,220]});
    act.config({objkey:"act",effect:new SynwWid(),visible:false});
    temp_val.config({objkey:"temp_val",size:"1rem",effect:new HrzPos("right")});
    cmp0_1_1_0.config({size:"1rem",style:{'margin-left':'0.25rem'}});
    cmp0_1.config({layout:new Grid([50,50]),style:{'margin-top':'0.3rem'}});
    swcir_0.config({size:new mofron.class.ConfArg("0.6rem","0.6rem"),src:"./img/switch.png",effect:[swcir_0_0,swcir_0_1]});
    swcir_2.config({eid:2,speed:500});
    swcir_3.config({eid:3,speed:500});
    swcir.config({objkey:"swcir",size:"0.8rem",baseColor:[250,80,80],event:new Click(sw_evt),effect:[swcir_1,swcir_2,swcir_3]});
    dsc_txt.config({objkey:"dsc_txt",size:"0.3rem",effect:new HrzPos()});
    cmp0_2_0.config({height:new mofron.class.ConfArg("0.5rem",),width:"100%"});
    cmp0_2.config({style:{'position':'fixed','bottom':'0.1rem'},effect:new HrzPos()});
    cmp0_3.config({size:"0.4rem",event:new Click(bar_evt)});
    cmp0.config({title:"SeekGate",mainColor:[230,255,230],theme:{Text:{target:null,config:{font:"serif"}}},header:new mofron.class.PullConf({navi:cmp0_3})});

    /* script (before) */
    sby.height(156 * (window.innerWidth/208) + 'px');
    act.height(156 * (window.innerWidth/208) + 'px');

    /* start visible */
    let root_cmp = new mofron.class.Component([cmp0]);
    root_cmp.visible(true,() => {try{

        /* script (after) */

    }catch(e){console.error(e.stack);}});
} catch (e) {
    console.error(e.stack);
}
