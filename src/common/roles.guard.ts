import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserModule } from 'src/users/users.module';
// import { UserService } from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, 
    @InjectModel(User.name)
    private userModel: Model<User>,) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    console.log(request);
    console.log(roles);
    
    
    if (request?.user) {
      const { username } = request.user;
      const user = await this.userModel.findOne({username});
      return roles.includes(user.admin_perm);
    }

    return false;
  }
}