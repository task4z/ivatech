"use strict";(self.webpackChunkivatech_challenge=self.webpackChunkivatech_challenge||[]).push([[780],{7780:(A,c,t)=>{t.r(c),t.d(c,{LoginModule:()=>Z});var m=t(6895),d=t(9299),h=t(7579),u=t(2722),n=t(4650),p=t(9737),f=t(9549),v=t(4144),a=t(3546),C=t(4859),i=t(4006);function y(e,s){if(1&e&&(n.TgZ(0,"div")(1,"span",12),n._uU(2),n.qZA()()),2&e){const o=n.oxw();n.xp6(2),n.Oqu(o.error)}}const L=[{path:"",component:(()=>{class e{constructor(o,r){this.router=o,this.loginService=r,this.username="freddy",this.password="ElmStreet2019",this.error="",this.onDestroy$=new h.x}ngOnDestroy(){this.onDestroy$.next(),this.onDestroy$.complete()}ngOnInit(){this.loginService.checkLoginCookies().pipe((0,u.R)(this.onDestroy$)).subscribe(o=>{o.access_token&&this.router.navigateByUrl("/dashboard")})}valueChange(){this.error&&(this.error="")}login(){this.loginService.login(this.username,this.password).pipe((0,u.R)(this.onDestroy$)).subscribe({next:o=>{this.loginService.setTokenAndRefresh(o)},error:o=>{o?.error?.msg&&(this.error=o.error.msg)},complete:()=>{}})}}return e.\u0275fac=function(o){return new(o||e)(n.Y36(d.F0),n.Y36(p.r))},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-login"]],decls:23,vars:3,consts:[[1,"d-flex","align-items-center","justify-content-center","h-100"],[1,"col-10","col-md-5","col-lg-3","col-xl-2"],[1,"row"],[1,"col-6"],[1,"col-6","d-flex","align-items-center","justify-content-center"],["src","../../../assets/Freddys_Logo.svg","alt","fredy's logo",1,"col-12","col-md-12"],[1,"w-100"],["matInput","","placeholder","Username","name","username","required","",3,"ngModel","ngModelChange","change"],["matInput","","placeholder","Password","type","password","name","password","required","",3,"ngModel","ngModelChange","change"],[4,"ngIf"],[1,"d-flex","justify-content-center"],["mat-raised-button","","color","primary",3,"click"],[1,"text-danger"]],template:function(o,r){1&o&&(n.TgZ(0,"div",0)(1,"mat-card",1)(2,"mat-card-header")(3,"mat-card-title")(4,"div",2)(5,"div",3)(6,"h1"),n._uU(7,"Freddy's Artisanal Halloween Candy Shop"),n.qZA()(),n.TgZ(8,"div",4),n._UZ(9,"img",5),n.qZA()()()(),n.TgZ(10,"mat-card-content")(11,"form")(12,"div")(13,"mat-form-field",6)(14,"input",7),n.NdJ("ngModelChange",function(g){return r.username=g})("change",function(){return r.valueChange()}),n.qZA()()(),n.TgZ(15,"div")(16,"mat-form-field",6)(17,"input",8),n.NdJ("ngModelChange",function(g){return r.password=g})("change",function(){return r.valueChange()}),n.qZA()()()(),n.YNc(18,y,3,1,"div",9),n.qZA(),n.TgZ(19,"mat-card-actions")(20,"div",10)(21,"button",11),n.NdJ("click",function(){return r.login()}),n._uU(22," Login "),n.qZA()()()()()),2&o&&(n.xp6(14),n.Q6J("ngModel",r.username),n.xp6(3),n.Q6J("ngModel",r.password),n.xp6(1),n.Q6J("ngIf",r.error))},dependencies:[m.O5,f.KE,v.Nt,a.a8,a.dk,a.dn,a.n5,a.hq,C.lW,i._Y,i.Fj,i.JJ,i.JL,i.Q7,i.On,i.F],styles:[".w-15[_ngcontent-%COMP%]{width:15%}"]}),e})()}];let M=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[d.Bz.forChild(L),d.Bz]}),e})();var T=t(63);let Z=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[m.ez,M,T.m]}),e})()}}]);