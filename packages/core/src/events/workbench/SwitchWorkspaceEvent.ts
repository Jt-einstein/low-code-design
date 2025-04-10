import { ICustomEvent } from '@astraflux/low-code-shared';
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';

export class SwitchWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'switch:workspace';
}
