//src/models/memberModel.ts
import prisma from '../libs/db';

//創建會員模型class，跟prisma schema溝通
class MemberModel {
  //得會員資料，輸入參數name，id(可選)
  public async getMember(name: string, id?: number) {
    try {
      const member = await prisma.member.findFirst({ where: { name, id } });
      console.log(`data is : ${member}`);
      return member;
    } catch (error) {
      console.log(`can't find the data : ${error}`);
      return error;
    }
  }

  //使用email,passowrd藉由prisma到db撈資料
  public async getLoginUser(email: string, password: string) {
    return prisma.member.findFirst({ where: { email, password } });
  }

  //創建新會員資料，輸入參數name,email,password
  public async createMember(name: string, email: string, password: string) {
    try {
      const newMember = await prisma.member.create({
        data: { name, email, password },
      });
      return newMember;
    } catch (error) {
      console.log(`error creating member: ${error}`);
      return error;
    }
  }
}
export default MemberModel;
//導出此class