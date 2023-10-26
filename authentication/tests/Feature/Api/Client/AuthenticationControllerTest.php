<?php

namespace Tests\Feature\Api\Client;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticationControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test client login.
     *
     * @return void
     */
    public function testClientLogin()
    {
        $clientRole = \Spatie\Permission\Models\Role::create(['name' => 'client']);
        $user = User::factory()->create([
            'password' => bcrypt($password = $this->faker->password),
        ])->assignRole($clientRole);

        $response = $this->postJson(route('client.login'), [
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
     * Test client login.
     *
     * @return void
     */

    public function testClientLoginMissingCredentials()
    {
        $response = $this->postJson(route('client.login'));

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'email',
                'password',
            ]);
    }

    /**
     * Test client login.
     *
     * @return void
     */

    public function testClientLoginInvalidCredentials()
    {
        $user = User::factory()->create();

        $response = $this->postJson(route('client.login'), [
            'email' => $user->email,
            'password' => 'invalid-password',
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'password',
            ]);
    }

    /**
     * Test client logout.
     *
     * @return void
     */
    public function testClientLogout()
    {
        $clientRole = \Spatie\Permission\Models\Role::create(['name' => 'client']);
        $user = User::factory()->create()->assignRole($clientRole);

        $token = auth()->login($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson(route('client.logout'));

        $response->assertOk()
            ->assertJson([
                'message' => 'Successfully logged out',
            ]);
    }

    /** 
     * Test client logout.
     * 
     *  @return void
     */


    public function testClientLogoutUnauthenticated()
    {
        $response = $this->postJson(route('client.logout'));

        $response->assertUnauthorized();
    }

    /**
     * Test client token refresh.
     *
     * @return void
     */
    public function testClientTokenRefresh()
    {
        $clientRole = \Spatie\Permission\Models\Role::create(['name' => 'client']);
        $user = User::factory()->create()->assignRole($clientRole);

        $token = auth()->login($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson(route('client.refresh'));

        $response->assertOk()
            ->assertJsonStructure([
                'access_token',
                'token_type',
                'expires_in',
            ]);
    }


    /**
     * Test client token refresh.
     *
     * @return void
     */

    public function testClientTokenRefreshUnauthenticated()
    {
        $response = $this->postJson(route('client.refresh'));

        $response->assertUnauthorized();
    }



    /**
     * Test client me.
     *
     * @return void
     */
    public function testClientMe()
    {
        $clientRole = \Spatie\Permission\Models\Role::create(['name' => 'client']);
        $user = User::factory()->create()->assignRole($clientRole);

        $token = auth()->login($user);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson(route('client.me'));

        $response->assertOk()
            ->assertJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
    }


    /**
     * Test client me.
     *
     * @return void
     */

    public function testClientMeUnauthenticated()
    {
        $response = $this->postJson(route('client.me'));

        $response->assertUnauthorized();
    }
}
