import * as mongoose from 'mongoose';
export interface IBot {
	_id: mongoose.Types.ObjectId,
	bot: string,
	authToken: string,
	owner: string,
	team: Array<string>,
	public: string
}