# MarketBot Add Shadcn Components

> 🗒️ **Document Notes** | Before Next JS 15 & React 19, a developer could enter `npx shadcn@latest add .` to add all [shadcn/ui](https://ui.shadcn.com) components. However, in Next JS 15 & React 19, that command currently throws the following error:
> ```bash
> Something went wrong. Please check the error below for more details. If the problem persists, please open an issue on GitHub.
>
> The component at https://ui.shadcn.com/r/styles/new-york/..json was not found. It may not exist at the registry. Please make sure it is a valid component.
> ```
> The command below is a workaround to add all [shadcn/ui](https://ui.shadcn.com) components in Next JS 15 & React 19. The command adds all components manually.
>
> ⚠️**Important Note**: The below command will become outdated as soon as a new [shadcn/ui](https://ui.shadcn.com) component is added because it will not be included in the list. The command will need to be updated to include the new component.

---

### Add all shadcn/ui Components

```bash
npx shadcn@latest add sidebar accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel chart checkbox collapsible command context-menu table dialog drawer dropdown-menu form hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet skeleton slider sonner switch tabs textarea toast toggle toggle-group tooltip
```