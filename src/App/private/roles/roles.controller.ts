import { Controller } from '@nestjs/common';
import { RolesService } from '@/app/private/roles/roles.service';
import { BaseController } from '@/core/BaseController';

@Controller('roles')
export class RolesController extends BaseController {
    constructor(private readonly rolesService: RolesService) {
        super();
    }
}
