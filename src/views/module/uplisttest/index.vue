         
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="问题类型(报修类型)" prop="problem_type">
        <el-select v-model="queryParams.problem_type" placeholder="请选择问题类型(报修类型)" clearable size="small">
          <el-option
            v-for="dict in problemTypeOptions"
            :key="dict.key"
            :label="dict.value"
            :value="dict.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工单分派(大区分派)" prop="distri">
        <el-select v-model="queryParams.distri" placeholder="请选择工单分派(大区分派)" clearable size="small">
          <el-option
            v-for="dict in distriOptions"
            :key="dict.key"
            :label="dict.value"
            :value="dict.key"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="问题描述" prop="describe">
        <el-input
          v-model="queryParams.describe"
          placeholder="请输入问题描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="反馈门店" prop="store_type">
        <el-select v-model="queryParams.store_type" placeholder="请选择反馈门店" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系人电话" prop="tel">
        <el-input
          v-model="queryParams.tel"
          placeholder="请输入联系人电话"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="附件" prop="enclosure">
        <el-input
          v-model="queryParams.enclosure"
          placeholder="请输入附件"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工单定义补充(默认信息填)" prop="labelpub">
        <el-input
          v-model="queryParams.labelpub"
          placeholder="请输入工单定义补充(默认信息填)"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用其他" prop="large_type">
        <el-select v-model="queryParams.large_type" placeholder="请选择备用其他" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="其他" prop="other">
        <el-input
          v-model="queryParams.other"
          placeholder="请输入其他"
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
    <el-table v-loading="loading" :data="uplisttestList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />   
             <el-table-column label="id" align="center" prop="id" />   
             <el-table-column label="问题类型(报修类型)" align="center" prop="problem_type" :formatter="problemTypeFormat" />   
             <el-table-column label="工单分派(大区分派)" align="center" prop="distri" :formatter="distriFormat" />   
             <el-table-column label="问题描述" align="center" prop="describe" />   
             <el-table-column label="反馈门店" align="center" prop="store_type" />   
             <el-table-column label="联系人电话" align="center" prop="tel" />   
             <el-table-column label="附件" align="center" prop="enclosure" />   
             <el-table-column label="工单定义补充(默认信息填)" align="center" prop="labelpub" />   
             <el-table-column label="备用其他" align="center" prop="large_type" />   
             <el-table-column label="其他" align="center" prop="other" />    
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
            <!-- 添加或修改外部工单申请对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                  <el-form ref="form" :model="form" :rules="rules" label-width="80px">            
                    <el-form-item label="问题类型(报修类型)">
                      <el-select v-model="form.problem_type" placeholder="请选择问题类型(报修类型)">
                        <el-option
                          v-for="dict in problemTypeOptions"
                          :key="dict.key"
                          :label="dict.value"
                          :value="dict.key"
                        ></el-option>
                      </el-select>
                    </el-form-item>            
                    <el-form-item label="工单分派(大区分派)">
                      <el-select v-model="form.distri" placeholder="请选择工单分派(大区分派)">
                        <el-option
                          v-for="dict in distriOptions"
                          :key="dict.key"
                          :label="dict.value"
                          :value="dict.key"
                        ></el-option>
                      </el-select>
                    </el-form-item>            
                    <el-form-item label="问题描述" prop="describe">
                      <el-input v-model="form.describe" placeholder="请输入问题描述" />
                    </el-form-item>            
                    <el-form-item label="联系人电话" prop="tel">
                      <el-input v-model="form.tel" placeholder="请输入联系人电话" />
                    </el-form-item>            
                    <el-form-item label="附件" prop="enclosure">
                      <el-input v-model="form.enclosure" placeholder="请输入附件" />
                    </el-form-item>            
                    <el-form-item label="工单定义补充(默认信息填)" prop="labelpub">
                      <el-input v-model="form.labelpub" placeholder="请输入工单定义补充(默认信息填)" />
                    </el-form-item>            
                    <el-form-item label="其他" prop="other">
                      <el-input v-model="form.other" placeholder="请输入其他" />
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
import { listUplisttest, getUplisttest, delUplisttest, addUplisttest, updateUplisttest } from '@/api/module/uplisttest'
export default {
  name: "uplisttest",
  data() {
    return {
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
          // 外部工单申请表格数据
          uplisttestList: [],
          // 弹出层标题
          title: "",
          // 是否显示弹出层
          open: false,           
            // problem_type字典
            problemTypeOptions: [],           
            // distri字典
            distriOptions: [],          
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,          
          problem_type: null,          
          distri: null,          
          describe: null,          
          store_type: null,          
          tel: null,          
          enclosure: null,          
          labelpub: null,          
          large_type: null,          
          other: null,          
        },
        // 表单参数
          form: {},
          // 表单校验
          rules: {              
          }
      };
    },
    created() {
        this.getList();    
        this.getDicts("type_test").then(response => {
          this.problemTypeOptions = response.data.values || [];
        });    
        this.getDicts("daqu_type").then(response => {
          this.distriOptions = response.data.values || [];
        });    
    },
    methods: {
        /** 查询外部工单申请列表 */
        getList() {
          this.loading = true;
          listUplisttest(this.queryParams).then(response => {
            this.uplisttestList = response.data.list;
            this.total = response.data.total;
            this.loading = false;
          });
        },        
        // $comment字典翻译
        problemTypeFormat(row, column) {
          return this.selectDictLabel(this.problemTypeOptions, row.problem_type);
        },        
        // $comment字典翻译
        distriFormat(row, column) {
          return this.selectDictLabel(this.distriOptions, row.distri);
        },        
        // 取消按钮
        cancel() {
          this.open = false;
          this.reset();
        },
        // 表单重置
        reset() {
          this.form = {    
            id: null,    
            problem_type: null,    
            distri: null,    
            describe: null,    
            store_type: null,    
            tel: null,    
            enclosure: null,    
            labelpub: null,    
            large_type: null,    
            other: null    
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加外部工单申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getUplisttest(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改外部工单申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateUplisttest(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addUplisttest(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除外部工单申请编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delUplisttest(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    } //methods结束
};
</script>