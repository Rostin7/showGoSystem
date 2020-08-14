export
function getSign(item) {
  this.$confirm('需要授权扫码时设置本值传输过程做了加密处理，请勿泄露多次设置以最后一次设置的值为准', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$prompt('请输入授权码', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^(?![^a-zA-Z]+$)(?!\D+$)[a-zA-Z0-9]{6,}$/,
      inputErrorMessage: '授权码不能为空且必须包含字母和数字'
    }).then(({ value }) => {
      this.$http({
        url: this.$http.adornUrl(this.apiList.login.getKey),
        method: 'post',
        data: this.$http.adornData('', '', false)
      }).then(({ data }) => {
        if (!data.result) {
          this.$message('获取公钥失败')
          this.loading = false
          return
        }
        RSA.setMaxDigits(131)
        const key = new RSA.RSAKeyPair(data.data.exponent, '', data.data.modulus)
        const pass = Base64.encode(RSA.encryptedString(key, value))
        console.log(this.apiList.shop.setAuthCode)
        this.$http({
          url: this.$http.adornUrl(this.apiList.shop.setAuthCode),
          method: 'post',
          data: this.$http.adornData({ activityId: item.activityId, activityType: 301, authCode: pass }, this.apiList.shop.setAuthCode, true)
        }).then(({ data }) => {
          if (data.result) {
            this.$message({
              message: '授权码设置成功',
              type: 'success'
            })
          }
        })
      })
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '取消输入'
      })
    })
  }).catch(() => {
    console.log('取消')
  })
}
