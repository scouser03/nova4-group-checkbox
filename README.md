# A GroupCheckbox field for Laravel Nova 4

## Installation

First you must install this package in to a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require scouser03/group-checkbox
```

## Usage

```php
namespace App\Nova;

use Scouser03\GroupCheckbox\GroupCheckbox;


class BlogPost extends Resource
{
    // ...

    public function fields(Request $request)
    {
        return [
            // ...

            GroupCheckbox::make(__('Permissions'), 'prepared_permissions')
                ->withGroups()
                ->options(ModelsPermission::all()->map(function ($permission, $key) {
                return [
                    'group'  => __(ucfirst($permission->group)),
                    'option' => $permission->name,
                    'label'  => __($permission->name),
                ];
            })->groupBy('group')->toArray()),

            // ...
        ];
    }
}

```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
