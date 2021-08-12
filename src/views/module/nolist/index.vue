         
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
      <el-form-item label="单名" prop="sp_name">
        <el-input
          v-model="queryParams.sp_name"
          placeholder="请输入单名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发起时间" prop="apply_time">
        <el-input
          v-model="queryParams.apply_time"
          placeholder="请输入发起时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="填报人id" prop="userid">
        <el-input
          v-model="queryParams.userid"
          placeholder="请输入填报人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主体内容详情" prop="datatest">
        <el-input
          v-model="queryParams.datatest"
          placeholder="请输入主体内容详情"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注人id" prop="useridtest">
        <el-input
          v-model="queryParams.useridtest"
          placeholder="请输入备注人id"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注填写时间" prop="commenttimel">
        <el-input
          v-model="queryParams.commenttimel"
          placeholder="请输入备注填写时间"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备注的详情" prop="commtest">
        <el-input
          v-model="queryParams.commtest"
          placeholder="请输入备注的详情"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用" prop="spare">
        <el-input
          v-model="queryParams.spare"
          placeholder="请输入备用"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用1" prop="spare1">
        <el-input
          v-model="queryParams.spare1"
          placeholder="请输入备用1"
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
<div id="myChart" class="chart-wrapper" :style="{width: '100%', height: '300px'}"></div>







    <el-table v-loading="loading" :data="nolistList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />   
             <el-table-column label="单号" align="center" prop="sp_no" />   
             <el-table-column label="单名" align="center" prop="sp_name" />   
             <el-table-column label="发起时间" align="center" prop="apply_time" />   
             <el-table-column label="填报人id" align="center" prop="userid" />   
             <el-table-column label="主体内容详情" align="center" prop="datatest" />   
             <el-table-column label="备注人id" align="center" prop="useridtest" />   
             <el-table-column label="备注填写时间" align="center" prop="commenttimel" />   
             <el-table-column label="备注的详情" align="center" prop="commtest" />   
             <el-table-column label="备用" align="center" prop="spare" />   
             <el-table-column label="备用1" align="center" prop="spare1" />    
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
            <!-- 添加或修改nolist对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                  <el-form ref="form" :model="form" :rules="rules" label-width="80px">            
                    <el-form-item label="单名" prop="sp_name">
                      <el-input v-model="form.sp_name" placeholder="请输入单名" />
                    </el-form-item>            
                    <el-form-item label="发起时间" prop="apply_time">
                      <el-input v-model="form.apply_time" placeholder="请输入发起时间" />
                    </el-form-item>            
                    <el-form-item label="填报人id" prop="userid">
                      <el-input v-model="form.userid" placeholder="请输入填报人id" />
                    </el-form-item>            
                    <el-form-item label="主体内容详情" prop="datatest">
                      <el-input v-model="form.datatest" placeholder="请输入主体内容详情" />
                    </el-form-item>            
                    <el-form-item label="备注人id" prop="useridtest">
                      <el-input v-model="form.useridtest" placeholder="请输入备注人id" />
                    </el-form-item>            
                    <el-form-item label="备注填写时间" prop="commenttimel">
                      <el-input v-model="form.commenttimel" placeholder="请输入备注填写时间" />
                    </el-form-item>            
                    <el-form-item label="备注的详情" prop="commtest">
                      <el-input v-model="form.commtest" placeholder="请输入备注的详情" />
                    </el-form-item>            
                    <el-form-item label="备用" prop="spare">
                      <el-input v-model="form.spare" placeholder="请输入备用" />
                    </el-form-item>            
                    <el-form-item label="备用1" prop="spare1">
                      <el-input v-model="form.spare1" placeholder="请输入备用1" />
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
import { listNolist, getNolist, delNolist, addNolist, updateNolist,listNolisttest } from '@/api/module/nolist'


export default {
  name: "nolist",
  data() {
    return {
          // chart:null,
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
          // nolist表格数据
          nolistList: [],
          nolistListtest:[],
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
          userid: null,          
          datatest: null,          
          useridtest: null,          
          commenttimel: null,          
          commtest: null,          
          spare: null,          
          spare1: null,          
        },
          queryParams1: { 
          sp_no: null,          
          sp_name: null,          
          apply_time: null,          
          userid: null,          
          datatest: null,          
          useridtest: null,          
          commenttimel: null,          
          commtest: null,          
          spare: null,          
          spare1: null,          
        },
        // 表单参数
          form: {},
          // 表单校验
          rules: {              
              sp_name: [
                { required: true, message: "单名不能为空", trigger: "blur" }
              ],              
          }
      };
    },
    created() {
        this.getList();
        // this.getListtest();   
              // this.drawLine();
            this.getListtest();
    },
    mounted () {
            //  this.drawLine();
            // this.getListtest();
             this.drawLine();

      //  this.timer = setInterval(this.drawLine, 1000);
      var t=setTimeout(() => {
      this.drawLine();
      }, 500);


            //  this.drawLine();
    },
    



    methods: {
          drawLine(){
            console.log("这是一个数组看看有没有数据",this.nolistListtest);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption( {
    title: {
        text: '工单主数据来源',
        subtext: '数据库所有时间段',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: this.nolistListtest,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
});
},

        /** 查询nolist列表 */
        getList() {
          this.loading = true;
          listNolist(this.queryParams).then(response => {
            this.nolistList = response.data.list;
             console.log(response);
            this.total = response.data.total;
            this.loading = false;
          });
        }, 
        
                /** 查询getListtest列表 */
        getListtest() {
          this.loading = true;
          listNolisttest(this.queryParams1).then(response => {
            this.nolistListtest = response.data.list;
         
      
            console.log(response);
            console.log("有没有数据~~~~~ ",response.data.list);
            // this.total = response.data.total;
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
            userid: null,    
            datatest: null,    
            useridtest: null,    
            commenttimel: null,    
            commtest: null,    
            spare: null,    
            spare1: null    
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
      this.title = "添加nolist";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const sp_no = row.sp_no || this.ids
      getNolist(sp_no).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改nolist";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.sp_no != null) {
            updateNolist(this.form).then(response => {
              if (response.code === 0) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addNolist(this.form).then(response => {
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
      this.$confirm('是否确认删除nolist编号为"' + sp_nos + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delNolist(sp_nos);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    } //methods结束
};
</script>