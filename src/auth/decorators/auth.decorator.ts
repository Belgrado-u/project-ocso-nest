import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";
import { ROLES } from "../constants/role.constants";

export function Auth(...roles: ROLES[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(AuthGuard, RolesGuard)
    );
}