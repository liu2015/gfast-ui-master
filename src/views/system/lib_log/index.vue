      
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="id" prop="lib_id">
        <el-input
          v-model="queryParams.lib_id"
          placeholder="请输入id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="脚本名字" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入脚本名字"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上传门店编号" prop="pos_number">
        <el-input
          v-model="queryParams.pos_number"
          placeholder="请输入上传门店编号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上传门店机台号" prop="pos_ma">
        <el-input
          v-model="queryParams.pos_ma"
          placeholder="请输入上传门店机台号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="上传时间" prop="pos_time">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.pos_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择上传时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否成功状态" prop="pos_state">
        <el-input
          v-model="queryParams.pos_state"
          placeholder="请输入是否成功状态"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="脚本运行信息" prop="pos_msg">
        <el-input
          v-model="queryParams.pos_msg"
          placeholder="请输入脚本运行信息"
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
    <el-table v-loading="loading" :data="lib_logList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />   
             <el-table-column label="id" align="center" prop="lib_id" />   
             <el-table-column label="脚本名字" align="center" prop="title" />   
             <el-table-column label="上传门店编号" align="center" prop="pos_number" />   
             <el-table-column label="上传门店机台号" align="center" prop="pos_ma" />   
             <el-table-column label="上传时间" align="center" prop="pos_time" width="180">
               <template slot-scope="scope">
                 <span>{{ parseTime(scope.row.pos_time, '{y}-{m}-{d}') }}</span>
               </template>
             </el-table-column>   
             <el-table-column label="是否成功状态" align="center" prop="pos_state" />   
             <el-table-column label="脚本运行信息" align="center" prop="pos_msg" />    
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
            <!-- 添加或修改 lib_log对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                  <el-form ref="form" :model="form" :rules="rules" label-width="80px">            
                    <el-form-item label="脚本名字" prop="title">
                      <el-input v-model="form.title" placeholder="请输入脚本名字" />
                    </el-form-item>            
                    <el-form-item label="上传门店编号" prop="pos_number">
                      <el-input v-model="form.pos_number" placeholder="请输入上传门店编号" />
                    </el-form-item>            
                    <el-form-item label="上传门店机台号" prop="pos_ma">
                      <el-input v-model="form.pos_ma" placeholder="请输入上传门店机台号" />
                    </el-form-item>            
                    <el-form-item label="上传时间" prop="pos_time">
                      <el-date-picker clearable size="small" style="width: 200px"
                        v-model="form.pos_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择上传时间">
                      </el-date-picker>
                    </el-form-item>            
                    <el-form-item label="是否成功状态" prop="pos_state">
                      <el-input v-model="form.pos_state" placeholder="请输入是否成功状态" />
                    </el-form-item>            
                    <el-form-item label="脚本运行信息" prop="pos_msg">
                      <el-input v-model="form.pos_msg" placeholder="请输入脚本运行信息" />
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
import { listLib_log, getLib_log, delLib_log, addLib_log, updateLib_log } from '@/api/system/lib_log'
export default {
  name: "lib_log",
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
          //  lib_log表格数据
          lib_logList: [],
          // 弹出层标题
          title: "",
          // 是否显示弹出层
          open: false,          
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,          
          lib_id: null,          
          title: null,          
          pos_number: null,          
          pos_ma: null,          
          pos_time: null,          
          pos_state: null,          
          pos_msg: null,          
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
    },
    methods: {
        /** 查询 lib_log列表 */
        getList() {
          this.loading = true;
          listLib_log(this.queryParams).then(response => {
            this.lib_logList = response.data.list;
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
            title: null,    
            pos_number: null,    
            pos_ma: null,    
            pos_time: null,    
            pos_state: null,    
            pos_msg: null    
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
      this.title = "添加 lib_log";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const lib_id = row.lib_id || this.ids
      getLib_log(lib_id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改 lib_log";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.lib_id != null) {
            updateLib_log(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addLib_log(this.form).then(response => {
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
      this.$confirm('是否确认删除 lib_log编号为"' + lib_ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delLib_log(lib_ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    } //methods结束
};
</script>