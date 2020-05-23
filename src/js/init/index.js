/* require */
require('expose-loader?app!../conf/namesp.js');
require('mofron');
const AppBase=require("mofron-comp-appbase");
const Text=require("mofron-comp-text");
const Image=require("mofron-comp-image");
const HrzPos=require("mofron-effect-hrzpos");
const ClickTap=require("mofron-event-clicktap");
const SlideMenu=require("mofron-comp-slidemenu");
const TxtFrame=require("mofron-comp-txtframe");
const Dialog=require("mofron-comp-dialog");
const Button=require("mofron-comp-button");
const DropDown=require("mofron-comp-dropdown");
const SynwWid=require("mofron-effect-synwwid");
const VrtPos=require("mofron-effect-vrtpos");
const ttrg=require("tetraring4js");
const Frame=require("mofron-comp-frame");
const Grid=require("mofron-layout-grid");
const Fade=require("mofron-effect-fade");
const comutl=mofron.util.common;
const cmputl=mofron.util.component;
try {
    /* access */
    if(true===mofron.util.common.chkacc({device:'mobile'})){
        if(true===mofron.window.isPortrait()){
            document.documentElement.setAttribute('style','font-size:625%;');
        }
        mofron.window.portraitEvent(()=>{document.documentElement.setAttribute('style','font-size:625%;');});
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
    let rslt={
        none:()=>{
            alrt_img.visible(false);
            pass_img.visible(false);
            ret_txt.text("");
        },
        pass:()=>{
            alrt_img.visible(false);
            pass_img.visible(true);
            ret_txt.text("Pass");
        },
        alert:()=>{
            pass_img.visible(false);
            alrt_img.visible(true);
            ret_txt.text("Alert!!");
        },
    }

    /* script (init) */
    let bar_evt= () => {
        menu_cmp.visible(true);
    }
    let mnu_cls= () => {
        menu_cmp.visible(false);
    }
    let sel_evt = (s1,s2,s3) => {
        try {
            if (0 === s2) {
                ths_dlg.visible(true);
            } else if (2 === s2) {
                document.body.requestFullscreen();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    };
    
    let dbtn_evt = (db1,db2,db3) => {
        try {
            if ("OK" === db1.text().text()) {
                let data = "threshold=" + dropd.select();
                let req  = new XMLHttpRequest();
                req.onreadystatechange = function () {
                    if ( (this.readyState == 4) &&      // READYSTATE_COMPLETED
                         (this.status == 200) ) {       // HTTP_STATUS_OK
                        console.log( this.responseText );
                    }
                }
                req.open( 'POST', "http://" + location.hostname + "/cgi-bin/threshold.py" );
                req.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
                req.send(data);
            }
            ths_dlg.visible(false);
          
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    };
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

    let menu_cmp_0=new Image();
    let menu_cmp=new SlideMenu();
    let dropd=new DropDown();
    let ths_dlg_0=new mofron.class.Component();
    let ths_dlg=new Dialog();
    let cmp0_0_0=new mofron.class.Component();
    let sby_0=new Image();
    let sby=new Frame();
    let act=new Image();
    let cmp0_0_1=new mofron.class.Component();
    let temp_val=new Text("-");
    let cmp0_0_2_0=new mofron.class.Component();
    let cmp0_0_2_1_0=new Text("℃");
    let cmp0_0_2_1=new mofron.class.Component();
    let cmp0_0_2=new mofron.class.Component();
    let pass_img=new Image();
    let alrt_img=new Image();
    let ret_txt=new Text();
    let cmp0_0_3=new mofron.class.Component();
    let cmp0_0=new mofron.class.Component();
    let cmp0=new AppBase();
    let menu_cmp_1_0=new Text("Threshold");
    let menu_cmp_1=new TxtFrame();
    let ths_dlg_1=new Button("OK");
    let ths_dlg_2=new Button("Cancel");
    let ths_dlg_3=new SynwWid("-0.05rem");
    let sby_0_0=new HrzPos();
    let sby_0_1=new VrtPos();
    let pass_img_0=new HrzPos("center");
    let alrt_img_0=new HrzPos("center");
    let cmp0_1=new Image("./img/bars.png");
    menu_cmp_1.child([menu_cmp_1_0]);
    cmp0.child([cmp0_0]);
    cmp0_0.child([cmp0_0_0,cmp0_0_1,cmp0_0_2,cmp0_0_3]);
    cmp0_0_3.child([pass_img,alrt_img,ret_txt]);
    cmp0_0_2.child([cmp0_0_2_0,cmp0_0_2_1]);
    cmp0_0_2_1.child([cmp0_0_2_1_0]);
    cmp0_0_2_0.child([temp_val]);
    cmp0_0_1.child([sby,act]);
    sby.child([sby_0]);
    cmp0_0_0.child([menu_cmp,ths_dlg]);
    ths_dlg.child([ths_dlg_0]);
    ths_dlg_0.child([dropd]);
    menu_cmp.child([menu_cmp_0]);
    menu_cmp_0.config({size:new mofron.class.ConfArg("0.3rem","0.3rem"),event:new ClickTap(mnu_cls),style:new mofron.class.ConfArg({'position':'absolute','top':'0.25rem','left':'0.2rem'},{'lock':true}),src:"./img/close.png"});
    menu_cmp_1_0.config({size:"0.25rem",space:"0.05rem",style:{'margin-left':'0.2rem'}});
    menu_cmp_1.config({baseColor:[245,255,245],xCenter:false,borderWidth:new mofron.class.ConfArg("0.01rem","0rem","0.01rem","0rem")});
    menu_cmp.config({objkey:"menu_cmp",offset:"-0.01rem",position:"right",baseColor:[245,255,245],select:-1,reselect:true,selectEvent:sel_evt,style:{'padding-top':'0.8rem'},item:new mofron.class.ConfArg(menu_cmp_1,{size:new mofron.class.ConfArg("2.2rem","0.6rem")})});
    dropd.config({objkey:"dropd",size:new mofron.class.ConfArg("1.5rem","0.5rem"),baseColor:[230,255,230],effect:new HrzPos("center"),text:["36.0℃","36.1℃","36.2℃","36.3℃","36.4℃","36.5℃","36.6℃","36.7℃","36.8℃","36.9℃","37.0℃","37.1℃","37.2℃","37.3℃","37.4℃"]});
    ths_dlg_0.config({style:{'margin-top':'0.6rem'}});
    ths_dlg_1.config({baseColor:"none",accentColor:[0,0,0,0]});
    ths_dlg_2.config({baseColor:"none",accentColor:[0,0,0,0]});
    ths_dlg.config({objkey:"ths_dlg",headerHeight:"0.6rem",title:"Threshold",buttonEvent:dbtn_evt,button:new mofron.class.ConfArg([ths_dlg_1,ths_dlg_2],{size:new mofron.class.ConfArg("1.5rem","0.4rem")}),effect:ths_dlg_3});
    sby_0.config({size:new mofron.class.ConfArg("1rem","1rem"),src:"./img/standby.png",effect:[sby_0_0,sby_0_1]});
    sby.config({objkey:"sby",effect:new SynwWid(),baseColor:[220,220,220]});
    act.config({objkey:"act",effect:new SynwWid(),visible:false});
    temp_val.config({objkey:"temp_val",size:"1rem",effect:new HrzPos("right")});
    cmp0_0_2_1_0.config({size:"1rem",style:{'margin-left':'0.5rem'}});
    cmp0_0_2.config({layout:new Grid([50,50])});
    pass_img.config({objkey:"pass_img",size:new mofron.class.ConfArg("1.5rem","1.5rem"),visible:false,effect:pass_img_0,src:"./img/check.png"});
    alrt_img.config({objkey:"alrt_img",size:new mofron.class.ConfArg("1.5rem","1.5rem"),visible:false,effect:alrt_img_0,src:"./img/false.png"});
    ret_txt.config({objkey:"ret_txt",effect:new HrzPos("center"),size:"0.5rem",style:{'position':'relative','top':'-0.3rem'}});
    cmp0_0_3.config({style:{'margin-top':'-0.5rem'}});
    cmp0_1.config({size:new mofron.class.ConfArg("0.3rem","0.3rem"),event:new ClickTap(bar_evt)});
    cmp0.config({title:"SeekGate",mainColor:[230,255,230],theme:{Text:{target:null,config:{font:"Cairo",mainColor:[96,131,127]}}},style:{'overflow':'hidden'},header:new mofron.class.PullConf({navi:cmp0_1})});

    /* script (before) */
    sby.height(156 * (window.innerWidth/208) + 'px');
    act.height(156 * (window.innerWidth/208) + 'px');

    /* start visible */
    let root_cmp = new mofron.class.Component([cmp0]);
    root_cmp.visible(true,() => {try{

        /* script (after) */
        class Thermo{constructor(t){try{if("number"!=typeof t)throw new Error("invalid parameter");this.m_threshold=t,this.m_status="none",thm_obj=this,window.onbeforeunload=()=>{thm_obj.close()}}catch(t){throw console.error(t.stack),t}}start(){try{this.m_wsock=new WebSocket("ws:/"+location.host+":5000","thermo");let t=this,r=!1;this.m_wsock.addEventListener("open",e=>{r=!0,t.wsk_callback()(!0)}),this.m_wsock.addEventListener("close",r=>{t.wsk_callback()(!1),t.start()}),setTimeout(()=>{!1===r&&console.error("failed connect to thermo camera")},5e3),this.m_wsock.addEventListener("message",r=>{if(""===r.data)return;let e=JSON.parse(r.data);t.inf_event()(e);let o=null;o=this.m_threshold-1>e.temperature?"none":this.m_threshold>e.temperature?"pass":"alert",this.m_status!==o&&(this.m_status=o,t.sts_event()(o))})}catch(t){throw console.error(t.stack),t}}close(){try{this.m_wsock.close()}catch(t){throw console.error(t.stack),t}}wsk_callback(t){try{if(void 0===t){if(void 0===this.m_wskcb)throw new Error("could not find callback");return this.m_wskcb}if("function"!=typeof t)throw new Error("invalid parameter");this.m_wskcb=t}catch(t){throw console.error(t.stack),t}}inf_event(t){try{if(void 0===t){if(void 0===this.m_infcb)throw new Error("could not find event");return this.m_infcb}if("function"!=typeof t)throw new Error("invalid parameter");this.m_infcb=t}catch(t){throw console.error(t.stack),t}}sts_event(t){try{if(void 0===t){if(void 0===this.m_stscb)throw new Error("could not find event");return this.m_stscb}if("function"!=typeof t)throw new Error("invalid parameter");this.m_stscb=t}catch(t){throw console.error(t.stack),t}}}
        let thm_prs = () => {
            try {
                let thd_txt = dropd.text()[dropd.select()].text();
                let thd_val = parseFloat(thd_txt.substring(0, thd_txt.length-1));
                let thermo  = new Thermo(thd_val);
                
                /* websocket connection callback */
                thermo.wsk_callback((ws_p) => {
                    (true === ws_p) ? moni.start() : moni.stop();
                });
                
                /* thermo info receive event */
                thermo.inf_event((msg) => {
                    try {
                        act.base64("data:image/bmp;base64," + msg.image);
                        temp_val.text(msg.temperature + "");
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                });
                
                /* thermo status change event */
                thermo.sts_event((sts) => {
                    if ("none" === sts) {
                        rslt.none();
                    } else if ("pass") {
                        rslt.pass();
                    } else {
                        rslt.alert();
                    }
                    console.log(sts);
                });
                
                thermo.start();
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        }
        setTimeout(thm_prs,500);
        let req  = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if ( (this.readyState == 4) &&      // READYSTATE_COMPLETED
                 (this.status == 200) ) {       // HTTP_STATUS_OK
                let resp = JSON.parse(this.responseText);
                dropd.select(parseInt(resp.contents));
            }
        }
        req.open( 'GET', "http://" + location.hostname + "/cgi-bin/threshold.py" );
        req.send();
        
        //dropd

    }catch(e){console.error(e.stack);}});
} catch (e) {
    console.error(e.stack);
}
