import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
  routes: {
    updateOneBase: {
      allowParamsOverride: true,
    },
    deleteOneBase: {
      returnDeleted: true,
    },
  },
});
