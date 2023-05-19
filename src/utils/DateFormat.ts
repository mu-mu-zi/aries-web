import moment from 'moment';

/*
* 时间戳格式化（秒）
* */
export const unixFormatTime = (unix: number) => moment.unix(unix / 1000).format('YYYY-MM-DD HH:mm:ss');
