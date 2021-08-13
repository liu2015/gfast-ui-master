      
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="单号" prop="sp_id">
        <el-input
          v-model="queryParams.sp_id"
          placeholder="请输入单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="msg信息" prop="errmsg">
        <el-input
          v-model="queryParams.errmsg"
          placeholder="请输入msg信息"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="错误id" prop="errcode">
        <el-input
          v-model="queryParams.errcode"
          placeholder="请输入错误id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否再次被拉去" prop="sort">
        <el-input
          v-model="queryParams.sort"
          placeholder="请输入是否再次被拉去"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="starttime">
        <el-input
          v-model="queryParams.starttime"
          placeholder="请输入开始时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="至时间" prop="endtime">
        <el-input
          v-model="queryParams.endtime"
          placeholder="请输入至时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工单类型名字" prop="sp_name">
        <el-input
          v-model="queryParams.sp_name"
          placeholder="请输入工单类型名字"
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
    <el-table v-loading="loading" :data="workList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />   
             <el-table-column label="单号" align="center" prop="sp_id" />   
             <el-table-column label="msg信息" align="center" prop="errmsg" />   
             <el-table-column label="错误id" align="center" prop="errcode" />   
             <el-table-column label="是否再次被拉去" align="center" prop="sort" />   
             <el-table-column label="开始时间" align="center" prop="starttime" />   
             <el-table-column label="至时间" align="center" prop="endtime" />   
             <el-table-column label="工单类型名字" align="center" prop="sp_name" />    
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
            <!-- 添加或修改work对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                  <el-form ref="form" :model="form" :rules="rules" label-width="80px">            
                    <el-form-item label="msg信息" prop="errmsg">
                      <el-input v-model="form.errmsg" placeholder="请输入msg信息" />
                    </el-form-item>            
                    <el-form-item label="错误id" prop="errcode">
                      <el-input v-model="form.errcode" placeholder="请输入错误id" />
                    </el-form-item>            
                    <el-form-item label="是否再次被拉去" prop="sort">
                      <el-input v-model="form.sort" placeholder="请输入是否再次被拉去" />
                    </el-form-item>            
                    <el-form-item label="开始时间" prop="starttime">
                      <el-input v-model="form.starttime" placeholder="请输入开始时间" />
                    </el-form-item>            
                    <el-form-item label="至时间" prop="endtime">
                      <el-input v-model="form.endtime" placeholder="请输入至时间" />
                    </el-form-item>            
                    <el-form-item label="工单类型名字" prop="sp_name">
                      <el-input v-model="form.sp_name" placeholder="请输入工单类型名字" />
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
import { listWork, getWork, delWork, addWork, updateWork } from '@/api/module/work'
export default {
  name: "work",
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
          // work表格数据
          workList: [],
          // 弹出层标题
          title: "",
          // 是否显示弹出层
          open: false,          
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,          
          sp_id: null,          
          errmsg: null,          
          errcode: null,          
          sort: null,          
          starttime: null,          
          endtime: null,          
          sp_name: null,          
        },
        // 表单参数
          form: {},
          // 表单校验
          rules: {              
              sp_name: [
                { required: true, message: "工单类型名字不能为空", trigger: "blur" }
              ]              
          }
      };
    },
    created() {
        this.getList();    
    },
    methods: {
        /** 查询work列表 */
        getList() {
          this.loading = true;
          listWork(this.queryParams).then(response => {
            this.workList = response.data.list;
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
            sp_id: null,    
            errmsg: null,    
            errcode: null,    
            sort: null,    
            starttime: null,    
            endtime: null,    
            sp_name: null    
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
      this.ids = selection.map(item => item.sp_id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加work";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const sp_id = row.sp_id || this.ids
      getWork(sp_id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改work";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.sp_id != null) {
            updateWork(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addWork(this.form).then(response => {
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
      const sp_ids = row.sp_id || this.ids;
      this.$confirm('是否确认删除work编号为"' + sp_ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delWork(sp_ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    } //methods结束
};
</script>