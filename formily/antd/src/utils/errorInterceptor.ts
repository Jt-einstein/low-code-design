import { message } from 'antd';

enum EErrorCode {
  /** 用户不存在或已禁用 */
  loginUserBan = 'login.error.0002',
  /** 登录名或密码不正确 */
  loginUserOrPasswordError = 'login.error.0003',
  /** 登录需要检验角色密码 */
  loginNeedRolePassword = 'login.error.0004',
  /** 令牌无效，需要重新登录 */
  tokenInvalid = 'sys.token.invalid',
  /** 接口不允许访问（目前 token 过期是返回这个） */
  accessDenied = 'Sys.Api.AccessDenied',
}

// 检查是否是静默接口
function checkSilent(apiUrls: string): boolean {
  return [].some((item) => item.endsWith(apiUrls));
}

const getData = async (response, request) => {
  if (request?.responseType === 'blob') {
    return await response.clone().arrayBuffer();
  }
  return await response.clone().json();
};

export const errorInterceptor = async (response, request) => {
  const data = await getData(response, request);
  if (data?.errors) {
    const tokenInvalid = data.errors.find(
      (err) => err?.errorCode === EErrorCode.tokenInvalid || err?.errorCode === EErrorCode.accessDenied,
    );

    // 静默接口不弹出错误信息
    if (!checkSilent(response.url) && !tokenInvalid) {
      data.errors.forEach((err) => {
        message.error(err?.errorContent);
      });
    }
    return data;
  }
  return response;
};
