export interface ITag {
	id: string; // 난수
	name: string;
	color: string;
	memo: string[] // memo Id
}

export interface IMemo {
	id: string; // 난수
	tagId: string; // 연결된 태그의 id. tag Type 참고
	content: string; // 메모 내용
	createTime: number; // Date.now()
}

export interface IUser {
	userId: string; // 유저의 로그인한 아이디. cpie1216
	userEmail: string; // 유저의 로그인 한 이메일 cpie1216@gmail.com
	connectSource: string // google, github 등 로그인 소스 (표시용)
}

export interface IDeleteTime {
	time: number; // Date().getTime()
}