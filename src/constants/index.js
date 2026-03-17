export const TIMEOUT = {
  API: 10000, // 10秒
  PAYMENT: 3600000, // 1小时
  SUCCESS_REDIRECT: 10000, // 10秒
  CANCEL_REDIRECT: 5000, // 5秒
};

export const PAYMENT_CHECK = {
  // 检查间隔时间(毫秒)
  INTERVAL: 2000,
  // 最大检查时间(毫秒)
  MAX_TIME: 60000,
  // 状态
  STATUS: {
    PENDING: "pending",
    SUCCESS: "success",
    ERROR: "error",
    TIMEOUT: "timeout",
  },

  // 洗车机状态
  WASH_MACHINE_STATUS: {
    PENDING: "pending",
    SUCCESS: "success",
    ERROR: "error",
  },
};

export const PAYMENT_STATUS = {
  PENDING: "pending", // 支付完成，等待最终支付结果
  PROCESSING: "processing", // 支付处理中
  SUCCESS: "success", // 支付成功
  TIMEOUT: "timeout", // 支付超时
  CANCELLED: "cancelled", // 支付取消
  FAIL: "fail", // 支付失败
};

// 支付来源
export const PAYMENT_FROM = {
  // 充值
  TOP_UP: "top-up",
  // VIP卡
  VIP_CARD: "vip-card",
  // 洗车机订单, 直接下单
  WASH_ORDER: "wash-order",
  // 订单, 从订单列表进入
  ORDER: "order",
};

// 支付方式
export const PAYMENT_METHOD = {
  MERCADO_PAGO: "Mercado Pago",
  BALANCE: "Balance",
};


export const INVITE_ROLE = {
  // 邀请方
  INVITER: 1,
  // 被邀请方
  INVITEE: 2,
};

export const INVITE_STATUS = {
  // 活动状态
  NOT_EXIST: -1, // 活动不存在
  // 正常状态
  NORMAL: 1, // 邀请方-可以继续邀请 / 被邀请方-符合新用户条件
  // 时间状态
  NOT_STARTED: 2, // 活动未开始
  EXPIRED: 3, // 活动已结束
  // 用户状态
  NOT_NEW_USER: 4, // 非新用户
  REGISTERED: 5, // 已被其他人邀请
  NOT_QUALIFIED: 6, // 不符合活动条件
  // 奖励状态
  NO_REWARD: 7, // 已达到奖励上限
  NOT_COMPLETED: 8, // 未完成规定任务
  // 风控状态
  FORBIDDEN: 9, // 账号被禁止参与活动
};