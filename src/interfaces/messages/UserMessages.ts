export interface IChatMsg {
	channel: string,
	name: string,
	nameColor: string,
	text: string,
	time: number,
	role: string,
	isFollower: boolean,
	isSubscriber: boolean,
	isOwner: boolean,
	isStaff: boolean,
	isCommunity: boolean,
	media: boolean,
	image: string,
	buffer: boolean,
	buffersent: boolean
}