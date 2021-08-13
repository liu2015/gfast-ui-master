                    
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="单号" prop="sp_no">
        <el-input
          v-model="queryParams.sp_no"
          placeholder="请输入单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="门店问题工单名字" prop="sp_name">
        <el-input
          v-model="queryParams.sp_name"
          placeholder="请输入门店问题工单名字"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发起时间" prop="apply_time">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.apply_time"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择发起时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="发起用户id" prop="applyer_userid">
        <el-input
          v-model="queryParams.applyer_userid"
          placeholder="请输入发起用户id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批详情数组" prop="sp_record">
        <el-input
          v-model="queryParams.sp_record"
          placeholder="请输入审批详情数组"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批状态" prop="sp_record_sp_status">
        <el-select v-model="queryParams.sp_record_sp_status" placeholder="请选择审批状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="审批人id" prop="details_userid">
        <el-input
          v-model="queryParams.details_userid"
          placeholder="请输入审批人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="审批意见" prop="details_speech">
        <el-input
          v-model="queryParams.details_speech"
          placeholder="请输入审批意见"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分支审批状态2是同意状态" prop="details_sp_status">
        <el-select v-model="queryParams.details_sp_status" placeholder="请选择分支审批状态2是同意状态" clearable size="small">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="审批时间" prop="details_sptime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.details_sptime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择审批时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="问题类型" prop="value_proble">
        <el-input
          v-model="queryParams.value_proble"
          placeholder="请输入问题类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报修类型" prop="value_repair">
        <el-input
          v-model="queryParams.value_repair"
          placeholder="请输入报修类型"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报修区域" prop="value_region">
        <el-input
          v-model="queryParams.value_region"
          placeholder="请输入报修区域"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="故障描述" prop="value_describe">
        <el-input
          v-model="queryParams.value_describe"
          placeholder="请输入故障描述"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="报修门店" prop="value_store">
        <el-input
          v-model="queryParams.value_store"
          placeholder="请输入报修门店"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="定义标签" prop="value_label">
        <el-input
          v-model="queryParams.value_label"
          placeholder="请输入定义标签"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="定义标签补充" prop="value_label_sup">
        <el-input
          v-model="queryParams.value_label_sup"
          placeholder="请输入定义标签补充"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注人id" prop="comment_userid">
        <el-input
          v-model="queryParams.comment_userid"
          placeholder="请输入备注人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注人时间" prop="commenttime">
        <el-date-picker clearable size="small" style="width: 200px"
          v-model="queryParams.commenttime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择备注人时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备注问题内容" prop="commentcontent">
        <el-input
          v-model="queryParams.commentcontent"
          placeholder="请输入备注问题内容"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input
          v-model="queryParams.remarks"
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
    <el-table v-loading="loading" :data="listinfoList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />   
             <el-table-column label="单号" align="center" prop="sp_no" />   
             <el-table-column label="门店问题工单名字" align="center" prop="sp_name" />   
             <el-table-column label="发起时间" align="center" prop="apply_time" width="180">
               <template slot-scope="scope">
                 <span>{{ parseTime(scope.row.apply_time, '{y}-{m}-{d}') }}</span>
               </template>
             </el-table-column>   
             <el-table-column label="发起用户id" align="center" prop="applyer_userid" />   
             <el-table-column label="审批详情数组" align="center" prop="sp_record" />   
             <el-table-column label="审批状态" align="center" prop="sp_record_sp_status" />   
             <el-table-column label="审批人id" align="center" prop="details_userid" />   
             <el-table-column label="审批意见" align="center" prop="details_speech" />   
             <el-table-column label="分支审批状态2是同意状态" align="center" prop="details_sp_status" />   
             <el-table-column label="审批时间" align="center" prop="details_sptime" width="180">
               <template slot-scope="scope">
                 <span>{{ parseTime(scope.row.details_sptime, '{y}-{m}-{d}') }}</span>
               </template>
             </el-table-column>   
             <el-table-column label="问题类型" align="center" prop="value_proble" />   
             <el-table-column label="报修类型" align="center" prop="value_repair" />   
             <el-table-column label="报修区域" align="center" prop="value_region" />   
             <el-table-column label="故障描述" align="center" prop="value_describe" />   
             <el-table-column label="报修门店" align="center" prop="value_store" />   
             <el-table-column label="定义标签" align="center" prop="value_label" />   
             <el-table-column label="定义标签补充" align="center" prop="value_label_sup" />   
             <el-table-column label="备注人id" align="center" prop="comment_userid" />   
             <el-table-column label="备注人时间" align="center" prop="commenttime" width="180">
               <template slot-scope="scope">
                 <span>{{ parseTime(scope.row.commenttime, '{y}-{m}-{d}') }}</span>
               </template>
             </el-table-column>   
             <el-table-column label="备注问题内容" align="center" prop="commentcontent" />   
             <el-table-column label="备注" align="center" prop="remarks" />    
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
            <!-- 添加或修改listinfo对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                  <el-form ref="form" :model="form" :rules="rules" label-width="80px">            
                    <el-form-item label="门店问题工单名字" prop="sp_name">
                      <el-input v-model="form.sp_name" placeholder="请输入门店问题工单名字" />
                    </el-form-item>            
                    <el-form-item label="发起时间" prop="apply_time">
                      <el-date-picker clearable size="small" style="width: 200px"
                        v-model="form.apply_time"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择发起时间">
                      </el-date-picker>
                    </el-form-item>            
                    <el-form-item label="发起用户id" prop="applyer_userid">
                      <el-input v-model="form.applyer_userid" placeholder="请输入发起用户id" />
                    </el-form-item>            
                    <el-form-item label="审批详情数组" prop="sp_record">
                      <el-input v-model="form.sp_record" placeholder="请输入审批详情数组" />
                    </el-form-item>            
                    <el-form-item label="审批人id" prop="details_userid">
                      <el-input v-model="form.details_userid" placeholder="请输入审批人id" />
                    </el-form-item>            
                    <el-form-item label="审批意见" prop="details_speech">
                      <el-input v-model="form.details_speech" placeholder="请输入审批意见" />
                    </el-form-item>            
                    <el-form-item label="审批时间" prop="details_sptime">
                      <el-date-picker clearable size="small" style="width: 200px"
                        v-model="form.details_sptime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择审批时间">
                      </el-date-picker>
                    </el-form-item>            
                    <el-form-item label="问题类型" prop="value_proble">
                      <el-input v-model="form.value_proble" placeholder="请输入问题类型" />
                    </el-form-item>            
                    <el-form-item label="报修类型" prop="value_repair">
                      <el-input v-model="form.value_repair" placeholder="请输入报修类型" />
                    </el-form-item>            
                    <el-form-item label="报修区域" prop="value_region">
                      <el-input v-model="form.value_region" placeholder="请输入报修区域" />
                    </el-form-item>            
                    <el-form-item label="故障描述" prop="value_describe">
                      <el-input v-model="form.value_describe" placeholder="请输入故障描述" />
                    </el-form-item>            
                    <el-form-item label="报修门店" prop="value_store">
                      <el-input v-model="form.value_store" placeholder="请输入报修门店" />
                    </el-form-item>            
                    <el-form-item label="定义标签" prop="value_label">
                      <el-input v-model="form.value_label" placeholder="请输入定义标签" />
                    </el-form-item>            
                    <el-form-item label="定义标签补充" prop="value_label_sup">
                      <el-input v-model="form.value_label_sup" placeholder="请输入定义标签补充" />
                    </el-form-item>            
                    <el-form-item label="备注人id" prop="comment_userid">
                      <el-input v-model="form.comment_userid" placeholder="请输入备注人id" />
                    </el-form-item>            
                    <el-form-item label="备注人时间" prop="commenttime">
                      <el-date-picker clearable size="small" style="width: 200px"
                        v-model="form.commenttime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择备注人时间">
                      </el-date-picker>
                    </el-form-item>            
                    <el-form-item label="备注问题内容" prop="commentcontent">
                      <el-input v-model="form.commentcontent" placeholder="请输入备注问题内容" />
                    </el-form-item>            
                    <el-form-item label="备注" prop="remarks">
                      <el-input v-model="form.remarks" placeholder="请输入备注" />
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
import { listListinfo, getListinfo, delListinfo, addListinfo, updateListinfo } from '@/api/module/listinfo'
export default {
  name: "listinfo",
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
          // listinfo表格数据
          listinfoList: [],
          // 弹出层标题
          title: "",
          // 是否显示弹出层
          open: false,          
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,          
          sp_no: null,          
          sp_name: null,          
          apply_time: null,          
          applyer_userid: null,          
          sp_record: null,          
          sp_record_sp_status: null,          
          details_userid: null,          
          details_speech: null,          
          details_sp_status: null,          
          details_sptime: null,          
          value_proble: null,          
          value_repair: null,          
          value_region: null,          
          value_describe: null,          
          value_store: null,          
          value_label: null,          
          value_label_sup: null,          
          comment_userid: null,          
          commenttime: null,          
          commentcontent: null,          
          remarks: null,          
        },
        // 表单参数
          form: {},
          // 表单校验
          rules: {              
              sp_name: [
                { required: true, message: "门店问题工单名字不能为空", trigger: "blur" }
              ],              
              sp_record_sp_status: [
                { required: true, message: "审批状态不能为空", trigger: "blur" }
              ],              
              details_sp_status: [
                { required: true, message: "分支审批状态2是同意状态不能为空", trigger: "blur" }
              ],              
          }
      };
    },
    created() {
        this.getList();    
    },
    methods: {
        /** 查询listinfo列表 */
        getList() {
          this.loading = true;
          listListinfo(this.queryParams).then(response => {
            this.listinfoList = response.data.list;
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
            sp_no: null,    
            sp_name: null,    
            apply_time: null,    
            applyer_userid: null,    
            sp_record: null,    
            sp_record_sp_status: 0 ,    
            details_userid: null,    
            details_speech: null,    
            details_sp_status: 0 ,    
            details_sptime: null,    
            value_proble: null,    
            value_repair: null,    
            value_region: null,    
            value_describe: null,    
            value_store: null,    
            value_label: null,    
            value_label_sup: null,    
            comment_userid: null,    
            commenttime: null,    
            commentcontent: null,    
            remarks: null    
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
      this.ids = selection.map(item => item.sp_no)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加listinfo";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const sp_no = row.sp_no || this.ids
      getListinfo(sp_no).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改listinfo";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.sp_no != null) {
            updateListinfo(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addListinfo(this.form).then(response => {
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
      const sp_nos = row.sp_no || this.ids;
      this.$confirm('是否确认删除listinfo编号为"' + sp_nos + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delListinfo(sp_nos);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    } //methods结束
};
</script>