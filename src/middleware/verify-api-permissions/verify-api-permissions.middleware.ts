import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { UserService } from 'src/module/user/user.service';

@Injectable()
export class VerifyApiPermissionsMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const { userId } = req.session.userInfo;

    const { role } = await this.userService.queryDetailById(userId, true, true);

    let isRootRole = false;
    const roleInUse = [];
    const apiPermissionsInUse = {};
    role.forEach((roleItem) => {
      const {
        id,
        name,
        status,
        isRoot = false,
        permissions = [],
      } = roleItem || {};
      if (status) {
        roleInUse.push({ id, name });
        isRoot && (isRootRole = true);
        if (permissions && permissions.length) {
          permissions.forEach((permissionsItem) => {
            if (
              !(permissionsItem.id in Object.keys(apiPermissionsInUse)) &&
              permissionsItem.type === 'BUTTON'
            ) {
              apiPermissionsInUse[permissionsItem.id] = permissionsItem;
            }
          });
        }
      }
    });

    req.session.userInfo = {
      ...req.session.userInfo,
      isRoot: isRootRole,
    };

    if (isRootRole) {
      return await next();
    }

    let { url = '', method = '' } = req || {};

    // 查到当前 url 是否有权限
    const hasPermissions = Object.values(apiPermissionsInUse).find(
      ({
        permissionsApi = '',
        permissionsMethod = '',
        permissionsApiIsRegex = 0,
      }) => {
        if (!permissionsApi) {
          return false;
        }
        url = url.replace(/\?.*/gi, '');
        method = method.toLowerCase();
        permissionsMethod = permissionsMethod || '';
        const permissionsMethodList = permissionsMethod
          .split(',')
          .map((item) => item.toLowerCase())
          .filter((_) => _);
        if (permissionsApiIsRegex) {
          const reg = new RegExp(permissionsApi, 'ig');
          return reg.test(url) && permissionsMethodList.includes(method);
        }
        return url === permissionsApi && permissionsMethodList.includes(method);
      },
    );

    if (!hasPermissions) {
      throw new ForbiddenException('当前接口无访问权限');
    }

    await next();
  }
}
