         
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="脚本id" prop="lib_id">
        <el-input
          v-model="queryParams.lib_id"
          placeholder="请输入脚本id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="脚本名字" prop="lib_name">
        <el-input
          v-model="queryParams.lib_name"
          placeholder="请输入脚本名字"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="脚本上传路径" prop="lib_rul">
        <el-input
          v-model="queryParams.lib_rul"
          placeholder="请输入脚本上传路径"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否解压" prop="lib_zip">
        <el-input
          v-model="queryParams.lib_zip"
          placeholder="请输入是否解压"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="简介" prop="lib_brief">
        <el-input
          v-model="queryParams.lib_brief"
          placeholder="请输入简介"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="内容" prop="lib_content">
        <el-input
          v-model="queryParams.lib_content"
          placeholder="请输入内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="添加时间" prop="lib_addtime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.lib_addtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择添加时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否禁用" prop="lib_open">
        <el-input
          v-model="queryParams.lib_open"
          placeholder="请输入是否禁用"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="版本" prop="lib_edit">
        <el-input
          v-model="queryParams.lib_edit"
          placeholder="请输入版本"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="lib_remk">
        <el-input
          v-model="queryParams.lib_remk"
          placeholder="请输入备注"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
        <el-form-item>
            <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="raryList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />   
             <el-table-column label="脚本id" align="center" prop="lib_id" />   
             <el-table-column label="脚本名字" align="center" prop="lib_name" />   
             <el-table-column label="脚本上传路径" align="center" prop="lib_rul" />   
             <el-table-column label="是否解压" align="center" prop="lib_zip" />   
             <el-table-column label="简介" align="center" prop="lib_brief" />   
             <el-table-column label="内容" align="center" prop="lib_content" />   
             <el-table-column label="添加时间" align="center" prop="lib_addtime" width="180">
               <template slot-scope="scope">
                 <span>{{ parseTime(scope.row.lib_addtime, '{y}-{m}-{d}') }}</span>
               </template>
             </el-table-column>   
             <el-table-column label="是否禁用" align="center" prop="lib_open" />   
             <el-table-column label="版本" align="center" prop="lib_edit" />   
             <el-table-column label="备注" align="center" prop="lib_remk" />    
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            />
            <!-- 添加或修改rary对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                  <el-form ref="form" :model="form" :rules="rules" label-width="80px">            
                    <el-form-item label="脚本名字" prop="lib_name">
                      <el-input v-model="form.lib_name" placeholder="请输入脚本名字" />
                    </el-form-item>     

                          
                    <el-form-item label="脚本上传路径" prop="lib_rul">
                      <el-input disabled v-model="form.lib_rul" placeholder="请输入脚本上传路径" />
                    </el-form-item> 
                   
                    <el-form-item label="脚本上传路径">
                    
                    <!-- 附件上传组件辅助 -->
<el-upload
ref="upload"
:limit="1"
accept="zip,jpg,png"
:action="upload.url"
:headers="upload.headers"
:file-list="upload.fileList"
:on-progress="handleFileUploadProgress"
:on-success="handleFileSuccess"
:auto-upload="false">
<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
<el-button style="margin-left: 10px;" size="small" type="success" :loading="upload.isUploading" @click="submitUpload">上传到服务器</el-button>
<div slot="tip" class="el-upload__tip">只能上传.zip文件，且不超过50MB</div>
</el-upload>


                    
                    </el-form-item>


                    <el-form-item label="是否解压" prop="lib_zip">
                      <el-input v-model="form.lib_zip" placeholder="请输入是否解压" />
                    </el-form-item>            
                    <el-form-item label="简介" prop="lib_brief">
                      <el-input v-model="form.lib_brief" placeholder="请输入简介" />
                    </el-form-item>            
                    <el-form-item label="内容" prop="lib_content">
                      <el-input v-model="form.lib_content" placeholder="请输入内容" />
                    </el-form-item>            
                    <el-form-item label="添加时间" prop="lib_addtime">
                      <el-date-picker clearable size="small" style="width: 200px"
                        v-model="form.lib_addtime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择添加时间">
                      </el-date-picker>
                    </el-form-item>            
                    <el-form-item label="是否禁用" prop="lib_open">
                      <el-input v-model="form.lib_open" placeholder="请输入是否禁用" />
                    </el-form-item>            
                    <el-form-item label="版本" prop="lib_edit">
                      <el-input v-model="form.lib_edit" placeholder="请输入版本" />
                    </el-form-item>            
                    <el-form-item label="备注" prop="lib_remk">
                      <el-input v-model="form.lib_remk" placeholder="请输入备注" />
                    </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </div>
</template>
<script>
import { listRary, getRary, delRary, addRary, updateRary } from '@/api/module/rary'
import {getToken} from "@/utils/auth"
export default {
  name: "rary",
  data() {
    return {


// 上传参数
upload: {
// 是否禁用上传
isUploading: false,
// 设置上传的请求头部
headers: { Authorization: "Bearer " + getToken() },
// 上传的地址
url: process.env.VUE_APP_BASE_API + "/system/upload/upFile",
// process.env.VUE_APP_BASE_API + "/system/upload/upFile", // 上传的附件服务器地址

// 上传的文件列表
fileList: []
},


          // 遮罩层
          loading: true,
          // 选中数组
          ids: [],
          // 非单个禁用
          single: true,
          // 非多个禁用
          multiple: true,
          // 显示搜索条件
          showSearch: true,
          // 总条数
          total: 0,
          // rary表格数据
          raryList: [],
          // 弹出层标题
          title: "",
          // 是否显示弹出层
          open: false,          
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,          
          lib_id: null,          
          lib_name: null,          
          lib_rul: null,          
          lib_zip: null,          
          lib_brief: null,          
          lib_content: null,          
          lib_addtime: null,          
          lib_open: null,          
          lib_edit: null,          
          lib_remk: null,          
        },
        // 表单参数
          form: {},
          // 表单校验
          rules: {              
              lib_name: [
                { required: true, message: "脚本名字不能为空", trigger: "blur" }
              ], 
              lib_rul:[
                { required: true, message: "url不能为空，请手工上传", trigger: "blur" }
                ]

          }
      };
    },
    created() {
        this.getList();    
    },
    methods: {
        /** 查询rary列表 */
        getList() {
          this.loading = true;
          listRary(this.queryParams).then(response => {
            this.raryList = response.data.list;
            this.total = response.data.total;
            this.loading = false;
          });
        },        
        // 取消按钮
        cancel() {
          this.open = false;
          this.reset();
        },
        // 表单重置
        reset() {
          this.form = {    
            lib_id: null,    
            lib_name: null,    
            lib_rul: null,    
            lib_zip: null,    
            lib_brief: null,    
            lib_content: null,    
            lib_addtime: null,    
            lib_open: null,    
            lib_edit: null,    
            lib_remk: null    
          };
          this.resetForm("form");
        },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.lib_id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加rary";
      this.upload.fileList = [];
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const lib_id = row.lib_id || this.ids
      getRary(lib_id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改rary";
          this.upload.fileList = [{ name: this.form.lib_name, url: this.form.lib_rul }];

      });
    },

    submitUpload(){
  this.$refs.upload.submit();
    },

// 文件上传中处理
handleFileUploadProgress(event, file, fileList) {
  this.upload.isUploading = true;
},
// 文件上传成功处理
handleFileSuccess(response, file, fileList) {
  this.upload.isUploading = false;
  this.form.lib_rul=response.data.fileInfo.fileUrl;
 
  this.msgSuccess(response.msg);
  console.log(response.data.fileInfo.fileUrl);
  console.log(response.msg);
  console.log(response)
  // 没有获得url地址
},



    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.lib_id != null) {
            updateRary(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addRary(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const lib_ids = row.lib_id || this.ids;
      this.$confirm('是否确认删除rary编号为"' + lib_ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRary(lib_ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    } //methods结束
};
</script>