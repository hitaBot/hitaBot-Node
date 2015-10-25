import * as mongoose from 'mongoose';
export interface IChannel {
	channel: string,
	enabled: boolean,
	premium: boolean,
	bot: string,
	botRef: mongoose.Types.ObjectId
}