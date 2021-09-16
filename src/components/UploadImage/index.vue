<template>
  <div class="component-upload-image">
    <el-upload
      :action="uploadImgUrl"
      list-type="picture-card"
      :on-success="handleUploadSuccess"
      :before-upload="handleBeforeUpload"
      :on-error="handleUploadError"
      name="file"
      :show-file-list="false"
      :headers="headers"
      style="display: inline-block; vertical-align: top"
    >
     <div class="el-upload__tip" slot="tip" style="color: #ff4949">只能上传jpg/png文件，且不超过5MB</div>

      <el-image v-if="!value" :src="value">
        <div slot="error" class="image-slot">
          <i class="el-icon-plus" />
        </div>
      </el-image>
      <div v-else class="image">
        <el-image :src="value" :style="`width:150px;height:150px;`" fit="fill"/>
        <div class="mask">
          <div class="actions">
            <span title="预览" @click.stop="dialogVisible = true">
              <i class="el-icon-zoom-in" />
            </span>
            <span title="移除" @click.stop="removeImage">
              <i class="el-icon-delete" />
            </span>
          </div>
        </div>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览" width="800" append-to-body>
      <img :src="value" style="display: block; max-width: 100%; margin: 0 auto;">
    </el-dialog>
  </div>
</template>

<script>
  import { getToken } from "@/utils/auth";

  export default {
    data() {
      return {
        dialogVisible: false,
        uploadImgUrl: process.env.VUE_APP_BASE_API + "/system/upload/upFile", // 上传的图片服务器地址
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      };
    },
    props: {
      value: {
        type: String,
        default: "",
      },
    },
    methods: {
      removeImage() {
        this.$emit("input", "");
      },
      handleUploadSuccess(res) {
        // const url= process.env.VUE_APP_BASE_API+res.data.fileInfo.fileName;
        const url=res.data.fileInfo.fileUrl;
        console.log(res);
        this.$emit("input",url);
        this.loading.close();
      },
      handleBeforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 5
        if (file.type.indexOf("image/") == -1) {
          this.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
          return false;
        }
        if(!isLt2M) {
          this.msgError('上传文件大小不能超过 5MB!');
          return false;
        }
        this.loading = this.$loading({
          lock: true,
          text: "上传中",
          background: "rgba(0, 0, 0, 0.7)",
        });
      },
      handleUploadError() {
        this.$message({
          type: "error",
          message: "上传失败",
        });
        this.loading.close();
      },
    },
    watch: {},
  };
</script>

<style scoped lang="scss">
  .image {
    position: relative;
    .mask {
      opacity: 0;
      position: absolute;
      top: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.3s;
    }
    &:hover .mask {
      opacity: 1;
    }
  }
</style>
