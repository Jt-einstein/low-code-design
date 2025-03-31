import { ICustomEvent } from 'low-code-shared';
import { AbstractWorkspaceEvent } from './AbstractWorkspaceEvent';
export class AddWorkspaceEvent
  extends AbstractWorkspaceEvent
  implements ICustomEvent
{
  type = 'add:workspace';
}
