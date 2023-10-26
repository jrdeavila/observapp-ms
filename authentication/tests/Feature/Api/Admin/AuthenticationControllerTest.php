<?php

namespace Tests\Feature\Api\Admin;


use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test admin login.
     *
     * @return void
     */
    public function testClientLogin()
    {
        $adminRole = \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $user = User::factory()->create([
            'password' => bcrypt($password = $this->faker->password),
        ])->assignRole($adminRole);

        $response = $this->postJson(route('admin.login'), [
            'email' => $user->email,
            'password' => $password,
        ]);

        $response->assertOk()
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);
    }


    /**
     * Test admin login.
     *
     * @return void
     */

    public function testClientLoginMissingCredentials()
    {
        $response = $this->postJson(route('admin.login'));

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'email',
                'password',
            ]);
    }

    /**
     * Test admin login.
     *
     * @return void
     */

    public function testClientLoginInvalidCredentials()
    {
        $user = User::factory()->create();

        $response = $this->postJson(route('admin.login'), [
            'email' => $user->email,
            'password' => 'invalid-password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'password',
            ]);
    }

    /**
     * Test admin logout.
     *
     * @return void
     */
    public function testClientLogout()
    {
        $adminRole = \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $user = User::factory()->create()->assignRole($adminRole);

        $token = auth()->login($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson(route('admin.logout'));

        $response->assertOk()
            ->assertJson([
                'message' => 'Successfully logged out',
            ]);
    }

    /** 
     * Test admin logout.
     * 
     *  @return void
     */


    public function testClientLogoutUnauthenticated()
    {
        $response = $this->postJson(route('admin.logout'));

        $response->assertUnauthorized();
    }

    /**
     * Test admin token refresh.
     *
     * @return void
     */
    public function testClientTokenRefresh()
    {
        $adminRole = \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $user = User::factory()->create()->assignRole($adminRole);

        $token = auth()->login($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson(route('admin.refresh'));

        $response->assertOk()
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);
    }


    /**
     * Test admin token refresh.
     *
     * @return void
     */

    public function testClientTokenRefreshUnauthenticated()
    {
        $response = $this->postJson(route('admin.refresh'));

        $response->assertUnauthorized();
    }



    /**
     * Test admin me.
     *
     * @return void
     */
    public function testClientMe()
    {
        $adminRole = \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        $user = User::factory()->create()->assignRole($adminRole);

        $token = auth()->login($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson(route('admin.me'));

        $response->assertOk()
            ->assertJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
    }


    /**
     * Test admin me.
     *
     * @return void
     */

    public function testClientMeUnauthenticated()
    {
        $response = $this->postJson(route('admin.me'));

        $response->assertUnauthorized();
    }
}
