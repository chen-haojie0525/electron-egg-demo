(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-798c13e2"],{"7da6":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("h3",{style:{marginBottom:"16px"}},[e._v(" demo2 上传文件到sm图床实现 ")]),t("a-upload-dragger",{attrs:{name:"file",multiple:!0,action:e.action_url},on:{change:e.handleChange}},[t("p",{staticClass:"ant-upload-drag-icon"},[t("a-icon",{attrs:{type:"inbox"}})],1),t("p",{staticClass:"ant-upload-text"},[e._v(" Click or drag file to this area to upload ")]),t("p",{staticClass:"ant-upload-hint"},[e._v(" Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files ")])]),t("p"),0!==e.image_info.length?t("a-list",{attrs:{size:"small",bordered:"","data-source":e.image_info},scopedSlots:e._u([{key:"renderItem",fn:function(a){return t("a-list-item",{staticStyle:{"text-align":"left"}},[e._v(" "+e._s(a.id)+". "+e._s(a.imageUrlText)+": "),t("a",{attrs:{href:a.url,target:"_blank"}},[e._v(e._s(a.url))])])}}],null,!1,1795190281)}):e._e()],1)},i=[],l=(t("b0c0"),{data:function(){return{action_url:"/api/v1/example/uploadFile",image_info:[],num:0}},methods:{handleChange:function(e){var a=e.file.status;if("uploading"!==a&&console.log(e.file),"done"===a){var t=e.file.response;if(console.log("uploadRes:",t),"success"!==t.code)return this.$message.error("file upload failed ".concat(t.code," .")),!1;this.num++;var n=t.data;n.id=this.num,n.imageUrlText="image url",this.image_info.push(n),this.$message.success("".concat(e.file.name," file uploaded successfully."))}else"error"===a&&this.$message.error("".concat(e.file.name," file upload failed."))}}}),o=l,s=t("2877"),r=Object(s["a"])(o,n,i,!1,null,null,null);a["default"]=r.exports},b0c0:function(e,a,t){var n=t("83ab"),i=t("9bf2").f,l=Function.prototype,o=l.toString,s=/^\s*function ([^ (]*)/,r="name";n&&!(r in l)&&i(l,r,{configurable:!0,get:function(){try{return o.call(this).match(s)[1]}catch(e){return""}}})}}]);
//# sourceMappingURL=chunk-798c13e2.24c4b750.js.map