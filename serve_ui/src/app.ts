import router from 'umi/router';

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

// 登录权限
export function render(oldRender: Function) {
  
  if(false){
    oldRender();
  }else{
      router.push('/login')
      oldRender();
  }
}